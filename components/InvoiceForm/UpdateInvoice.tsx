import { axiosInstance } from '@/lib/axios';
import { FetchInvoice } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import InvoiceFormTemplate from './InvoiceFormTemplate';
import { Invoice } from './formSchema';

const updateInvoice = async (data: FetchInvoice) => {
  return axiosInstance.put(`/invoice/${data.id}`, data, {
    withCredentials: true,
  });
};

interface UpdateInvoiceProps {
  data: FetchInvoice;
}

export default function UpdateInvoice({ data }: UpdateInvoiceProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
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

  const handleUpdateInvoice = (formData: Invoice) => {
    mutate({ ...data, ...formData });
  };

  return (
    <InvoiceFormTemplate
      variant="update"
      defaultValues={{ ...data, date: new Date(data.date) }}
      onSubmit={handleUpdateInvoice}
      isPending={isPending}
      isSuccess={isSuccess}
      mark={data.mark}
    />
  );
}
