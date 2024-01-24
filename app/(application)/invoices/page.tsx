'use client';

import InvoiceError from '@/components/InvoiceError';
import CreateInvoice from '@/components/InvoiceForm/CreateInvoice';
import { Status, defaultValues } from '@/components/InvoiceForm/formSchema';
import InvoiceHeader from '@/components/InvoiceHeader';
import InvoiceList from '@/components/InvoiceList';
import InvoicePagination from '@/components/InvoicePagination';
import InvoiceStatusFilter from '@/components/InvoiceStatusFilter';
import Loading from '@/components/UI/Loading';
import useInvoices from '@/hooks/useInvoices';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const INVOICES_PER_PAGE = 6;

export default function InvoicesPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const { isLoading, error, data } = useInvoices(page, INVOICES_PER_PAGE);

  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([
    'DRAFT',
    'PENDING',
    'PAID',
  ]);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  if (error || !data) {
    let message = 'Try maybe later!';

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message;
      message = `Error: ${errorMessage}. ` + message;
    }

    return (
      <main className="flex items-center justify-center">
        <div className="max-w-[730px] px-6 md:px-10">
          <InvoiceError>
            <p>{message}</p>
          </InvoiceError>
        </div>
      </main>
    );
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
  const { lastPage } = data.meta;

  const filteredInvoices = invoices.filter((invoice) =>
    selectedStatuses.some((value) => invoice.status === value),
  );

  return (
    <main className="mx-auto flex w-full max-w-[730px] flex-col gap-8 overflow-hidden px-6 py-9 md:gap-[55px] md:px-12 md:py-[62px] lg:gap-16 lg:py-[78px]">
      <section className="flex items-center justify-between">
        <InvoiceHeader invoices={filteredInvoices} />

        <div className="flex items-center gap-[18px] md:gap-10">
          <InvoiceStatusFilter
            selectedStatuses={selectedStatuses}
            onCheckboxClick={handleCheckboxClick}
          />

          <CreateInvoice defaultValues={defaultValues} />
        </div>
      </section>

      <section className="flex flex-1 flex-col gap-5 overflow-hidden">
        <InvoiceList invoices={filteredInvoices} statuses={selectedStatuses} />

        <InvoicePagination
          invoicesLength={invoices.length}
          page={page}
          lastPage={lastPage}
        />
      </section>
    </main>
  );
}
