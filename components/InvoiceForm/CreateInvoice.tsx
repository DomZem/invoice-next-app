'use client';

import { Button } from '@/components/UI/Button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/UI/Sheet';
import useCreateInvoice from '@/hooks/invoice/useCreateInvoice';
import { MdAddCircle } from 'react-icons/md';
import InvoiceFormTemplate from './InvoiceFormTemplate';
import { Invoice } from './formSchema';

interface CreateInvoiceProps {
  defaultValues: Invoice;
}

export default function CreateInvoice({ defaultValues }: CreateInvoiceProps) {
  const { mutate, isPending, isError } = useCreateInvoice();

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
          onSubmit={(data: Invoice) => mutate(data)}
          isPending={isPending}
          isSuccess={!isPending && !isError}
        />
      </SheetContent>
    </Sheet>
  );
}
