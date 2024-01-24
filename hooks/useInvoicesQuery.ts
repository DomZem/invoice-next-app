import { axiosInstance } from '@/lib/axios';
import { FetchInvoice } from '@/types';
import { useQuery } from '@tanstack/react-query';

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

const fetchInvoices = async (page: number, size: number) => {
  const response = await axiosInstance.get<FetchPaginationInvoice>(
    `/invoice?page=${page}&size=${size}`,
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export default function useInvoicesQuery(page: number, size: number) {
  return useQuery({
    queryKey: ['invoices', page],
    queryFn: () => fetchInvoices(page, size),
  });
}
