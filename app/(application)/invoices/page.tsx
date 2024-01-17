'use client';

import CreateInvoice from '@/components/InvoiceForm/CreateInvoice';
import { defaultValues } from '@/components/InvoiceForm/formSchema';
import InvoiceHeader from '@/components/InvoiceHeader';
import Loading from '@/components/UI/Loading';
import { axiosInstance } from '@/lib/axios';
import { FetchInvoice } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

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

const fetchInvoices = async (page: number) => {
  const response = await axiosInstance.get<FetchPaginationInvoice>(
    `/invoice?page=${page}&perPage=${INVOICES_PER_PAGE}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export default function InvoicesPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');

  const { isLoading, error, data } = useQuery({
    queryKey: ['invoices', page],
    queryFn: () => fetchInvoices(page),
  });

  if (isLoading) {
    return (
      <main className="flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex items-center justify-center">
        <h1>Somehting went wrong</h1>
      </main>
    );
  }

  const invoices = data.data;

  return (
    <main className="mx-auto flex w-full max-w-[730px] flex-col gap-8 overflow-hidden px-6 py-9 md:gap-[55px] md:px-12 md:py-[62px] lg:gap-16 lg:py-[78px]">
      <section className="flex items-center justify-between">
        <InvoiceHeader invoices={invoices} />

        <div className="flex items-center gap-[18px] md:gap-10">
          <CreateInvoice defaultValues={defaultValues} />
        </div>
      </section>

      <section className="flex flex-1 flex-col gap-5 overflow-hidden">
        {/* Invoice list */}
      </section>
    </main>
  );
}
