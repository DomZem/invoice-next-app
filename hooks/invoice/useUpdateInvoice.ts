import { axiosInstance } from '@/lib/axios';
import { FetchInvoice } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const updateInvoice = async (data: FetchInvoice) => {
  const response = await axiosInstance.put(`/invoice/${data.id}`, data, {
    withCredentials: true,
  });

  return response.data;
};

export default function useUpdateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FetchInvoice) =>
      toast.promise(updateInvoice(data), {
        loading: `Upadting #${data.mark} invoice ...`,
        success: `Invoice #${data.mark} has been updated 🔥`,
        error: (error: Error | AxiosError) => {
          let message = "Something went wrong. Invoice hasn't been updated";

          if (axios.isAxiosError(error)) {
            return `${message}. Error: ${error.response?.data.message}`;
          }

          return message;
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}
