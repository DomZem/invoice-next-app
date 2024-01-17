'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/UI/AlertDialog';
import { Button } from '@/components/UI/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/UI/Sheet';
import { axiosInstance } from '@/lib/axios';
import { FetchInvoice } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import InvoiceMarkButton from './InvoiceMarkButton';

interface InvoiceDetailsActionsProps {
  data: FetchInvoice;
}

const deleteInvoice = async (id: number) => {
  return axiosInstance.delete(`/invoice/${id}`, {
    withCredentials: true,
  });
};

export default function InvoiceDetailsActions({
  data,
}: InvoiceDetailsActionsProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: (id: number) =>
      toast.promise(deleteInvoice(id), {
        loading: `Deleting #${data.mark} invoice ...`,
        success: `Invoice #${data.mark} has been deleted 🔥`,
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
      queryClient.invalidateQueries({ queryKey: ['invoices', data.id] });
    },
  });

  const handleDeleteInvoice = () => {
    mutate(data.id);
    router.back();
  };

  return (
    <div className="flex items-center gap-2">
      <Sheet>
        <Button variant="secondary" asChild>
          <SheetTrigger>Edit</SheetTrigger>
        </Button>
        <SheetContent
          side="left"
          className="top-[72px] h-[calc(100%-72px)] w-full max-w-[616px] md:top-20 md:h-[calc(100%-5rem)] md:max-w-[719px] md:rounded-r-[20px] lg:top-0 lg:h-full"
        >
          {/* Update Invoice */}
        </SheetContent>
      </Sheet>

      <AlertDialog>
        <Button variant="destructive" asChild>
          <AlertDialogTrigger>Delete</AlertDialogTrigger>
        </Button>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete invoice #{data.mark}? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteInvoice}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <InvoiceMarkButton status={data.status} id={data.id} />
    </div>
  );
}
