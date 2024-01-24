import { axiosInstance } from '@/lib/axios';
import { FetchInvoice } from '@/types';
import { useQuery } from '@tanstack/react-query';

const fetchInvoiceById = async (id: string): Promise<FetchInvoice> => {
  const response = await axiosInstance.get<FetchInvoice>(`/invoice/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

export default function useInvoiceQuery(id: string) {
  return useQuery<FetchInvoice>({
    queryFn: () => fetchInvoiceById(id),
    queryKey: ['invoices', id],
  });
}
