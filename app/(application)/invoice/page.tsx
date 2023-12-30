"use client";

import EmptyInvoices from "@/components/EmptyInvoices";
import CreateInvoice from "@/components/InvoiceForm/CreateInvoice";
import { Invoice, Status } from "@/components/InvoiceForm/formSchema";
import InvoiceList from "@/components/InvoiceList";
import InvoicePagination from "@/components/InvoicePagination";
import InvoiceStatusFilter from "@/components/InvoiceStatusFilter";
import { axiosInstance } from "@/lib/axios";
import { formatList } from "@/lib/utils";
import { FetchInvoice } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";

const INVOICES_PER_PAGE = 6;

type FetchPaginationInvoice = {
  data: FetchInvoice[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
};

const defaultValues: Invoice = {
  clientName: "",
  clientEmail: "",
  date: new Date(),
  status: "PENDING",
  paymentTerm: "NET_7",
  projectDescription: "",
  billFromAddress: {
    streetName: "",
    city: "",
    postCode: "",
    country: "",
  },
  billToAddress: {
    streetName: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [
    {
      name: "",
      price: 0,
      quantity: 0,
    },
  ],
};

const fetchInvoices = async (page: number) => {
  const response = await axiosInstance.get<FetchPaginationInvoice>(
    `/invoice?page=${page}&perPage=${INVOICES_PER_PAGE}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export default function InvoicePage() {
  const [page, setPage] = useState(1);
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([
    "DRAFT",
    "PENDING",
    "PAID",
  ]);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["invoices", page],
    queryFn: () => fetchInvoices(page),
  });

  if (isLoading) {
    return (
      <main className="flex items-center justify-center">
        <LuLoader2 className="animate-spin text-4xl font-bold text-primary" />
      </main>
    );
  }

  if (isError || !data) {
    return <h1>Something went wrong try maybe later!</h1>;
  }

  const handleCheckboxClick = (status: Status) => {
    setSelectedStatuses((prevSelectedStatuses) => {
      if (prevSelectedStatuses.includes(status)) {
        return prevSelectedStatuses.filter((s) => s !== status);
      } else {
        return [...prevSelectedStatuses, status];
      }
    });
  };

  const invoices = data.data;
  const filteredInvoices = invoices.filter((invoice) =>
    selectedStatuses.some((value) => invoice.status === value),
  );
  const { lastPage } = data.meta;

  return (
    <main className="mx-auto flex w-full max-w-[730px] flex-col gap-8 overflow-hidden px-6 py-9 md:gap-[55px] md:px-12 md:py-[62px] lg:gap-16 lg:py-[78px]">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="heading-m-text md:heading-l-text text-starlessNight dark:text-white">
            Invoices
          </h1>
          <p>
            {filteredInvoices.length === 0
              ? "No invoices"
              : filteredInvoices.length === 1
                ? "1 invoice"
                : `There are ${filteredInvoices.length} invoices`}
          </p>
        </div>

        <div className="flex items-center gap-[18px] md:gap-10">
          <InvoiceStatusFilter
            selectedStatuses={selectedStatuses}
            handleCheckboxClick={handleCheckboxClick}
          />

          <CreateInvoice defaultValues={defaultValues} />
        </div>
      </section>

      <section className="flex flex-1 flex-col gap-5 overflow-hidden">
        {!filteredInvoices.length ? (
          <EmptyInvoices>
            {selectedStatuses.length ? (
              <p>
                Create an invoice with status {formatList(selectedStatuses)} to
                display it by clicking the
              </p>
            ) : (
              <p>Create an invoice by clicking the</p>
            )}

            <p>
              <span className="font-bold">New</span> button and get started
            </p>
          </EmptyInvoices>
        ) : (
          <InvoiceList invoicesList={filteredInvoices} />
        )}

        <InvoicePagination
          page={page}
          lastPage={lastPage}
          onPreviousButtonClick={() => setPage((old) => Math.max(old - 1, 0))}
          onNextButtonClick={() => {
            setPage((old) => old + 1);
          }}
        />
      </section>
    </main>
  );
}
