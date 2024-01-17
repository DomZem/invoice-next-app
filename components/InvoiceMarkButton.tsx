'use client';

import { Button } from '@/components/UI/Button';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { Status } from './InvoiceForm/formSchema';

interface InvoiceMarkButtonProps {
  id: number;
  status: Status;
}

const updateInvoiceStatus = async ({
  id,
  status,
}: {
  id: number;
  status: Status;
}) => {
  return axiosInstance.patch(
    `/invoice/${id}`,
    { status },
    {
      withCredentials: true,
    },
  );
};

export default function InvoiceMarkButton({
  id,
  status,
}: InvoiceMarkButtonProps) {
  const queryClient = useQueryClient();

  const nextStatus: Status =
    status === 'DRAFT' ? 'PENDING' : status === 'PENDING' ? 'PAID' : 'DRAFT';

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { id: number; status: Status }) =>
      toast.promise(updateInvoiceStatus(data), {
        loading: 'Updating invoice status ...',
        success: `Invoice status has been updated to ${nextStatus.toLowerCase()} 🔥`,
        error: (error: Error | AxiosError) => {
          let message =
            "Something went wrong. Invoice status hasn't been updated";

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

  const handleUpdateInvoiceStatus = () => {
    mutate({ id, status: nextStatus });
  };

  return (
    <Button
      className="truncate"
      disabled={isPending}
      onClick={handleUpdateInvoiceStatus}
    >
      Mark as{' '}
      {status === 'DRAFT' ? 'Pending' : status === 'PENDING' ? 'Paid' : 'Draft'}
    </Button>
  );
}
