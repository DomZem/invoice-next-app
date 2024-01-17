'use client';

import { Button } from '@/components/UI/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/UI/Sheet';
import { axiosInstance } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { MdAddCircle } from 'react-icons/md';
import InvoiceFormTemplate from './InvoiceFormTemplate';
import { Invoice } from './formSchema';

const createInvoice = async (data: Invoice) => {
  return axiosInstance.post('/invoice', data, { withCredentials: true });
};

interface CreateInvoiceProps {
  defaultValues: Invoice;
}

export default function CreateInvoice({ defaultValues }: CreateInvoiceProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
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

  const handleCreateInvoice = (data: Invoice) => {
    mutate(data);
  };

  return (
    <Sheet>
      <Button className=" py-[6px] pl-[6px] pr-[15px]" asChild>
        <SheetTrigger className="flex items-center gap-2">
          <MdAddCircle className="text-[39px]" />
          New
        </SheetTrigger>
      </Button>
      <SheetContent
        side="left"
        className="top-[72px] h-[calc(100%-72px)] w-full max-w-[616px] md:top-20 md:h-[calc(100%-5rem)] md:max-w-[719px] md:rounded-r-[20px] lg:top-0 lg:h-full"
      >
        <InvoiceFormTemplate
          variant="create"
          defaultValues={defaultValues}
          onSubmit={handleCreateInvoice}
          isPending={isPending}
          isSuccess={!isPending && !isError}
        />
      </SheetContent>
    </Sheet>
  );
}
