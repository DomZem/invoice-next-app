'use client';

import { Button } from '@/components/UI/Button';
import useUpdateInvoiceStatus from '@/hooks/invoice/useUpdateInvoiceStatus';
import { Status } from './InvoiceForm/formSchema';

interface InvoiceMarkButtonProps {
  id: number;
  status: Status;
}

export default function InvoiceMarkButton({
  id,
  status,
}: InvoiceMarkButtonProps) {
  const { mutate, isPending } = useUpdateInvoiceStatus(status);

  return (
    <Button
      className="truncate"
      disabled={isPending}
      onClick={() => mutate({ id, status })}
    >
      Mark as{' '}
      {status === 'DRAFT' ? 'Pending' : status === 'PENDING' ? 'Paid' : 'Draft'}
    </Button>
  );
}
