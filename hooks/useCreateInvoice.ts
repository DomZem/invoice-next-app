import { Invoice } from '@/components/InvoiceForm/formSchema';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

const createInvoice = async (data: Invoice) => {
  return axiosInstance.post('/invoice', data, { withCredentials: true });
};

export default function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Invoice) =>
      toast.promise(createInvoice(data), {
        loading: 'Creating invoice ...',
        success: `Invoice for ${data.clientName} has been created 🔥`,
        error: (error: Error | AxiosError) => {
          let message = "Something went wrong. Invoice hasn't been created";

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
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}
