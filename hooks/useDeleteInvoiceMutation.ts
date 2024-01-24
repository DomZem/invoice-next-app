import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const deleteInvoice = async (id: number) => {
  return axiosInstance.delete(`/invoice/${id}`, {
    withCredentials: true,
  });
};

export default function useDeleteInvoiceMutation(id: number, mark: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      toast.promise(deleteInvoice(id), {
        loading: `Deleting #${mark} invoice ...`,
        success: `Invoice #${mark} has been deleted 🔥`,
        error: (error: Error | AxiosError) => {
          let message = "Something went wrong. Invoice hasn't been deleted";

          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data.message;
            if (errorMessage) {
              return `${message}. Error: ${errorMessage}`;
            }
          }

          return message;
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices', id] });
    },
  });
}
