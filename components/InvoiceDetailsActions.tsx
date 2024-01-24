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
import useDeleteInvoice from '@/hooks/useDeleteInvoice';
import { FetchInvoice } from '@/types';
import { useRouter } from 'next/navigation';
import UpdateInvoice from './InvoiceForm/UpdateInvoice';
import InvoiceMarkButton from './InvoiceMarkButton';

interface InvoiceDetailsActionsProps {
  data: FetchInvoice;
}

export default function InvoiceDetailsActions({
  data,
}: InvoiceDetailsActionsProps) {
  const { id, mark, status } = data;
  const { mutate } = useDeleteInvoice(id, mark);
  const router = useRouter();

  const handleDeleteInvoice = () => {
    mutate(id);
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
          <UpdateInvoice data={data} />
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
              Are you sure you want to delete invoice #{mark}? This action
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
      <InvoiceMarkButton status={status} id={id} />
    </div>
  );
}
