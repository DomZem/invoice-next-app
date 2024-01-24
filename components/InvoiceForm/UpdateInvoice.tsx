import useUpdateInvoice from '@/hooks/useUpdateInvoice';
import { FetchInvoice } from '@/types';
import InvoiceFormTemplate from './InvoiceFormTemplate';
import { Invoice } from './formSchema';

interface UpdateInvoiceProps {
  data: FetchInvoice;
}

export default function UpdateInvoice({ data }: UpdateInvoiceProps) {
  const { mutate, isPending, isSuccess } = useUpdateInvoice();

  return (
    <InvoiceFormTemplate
      variant="update"
      defaultValues={{ ...data, date: new Date(data.date) }}
      onSubmit={(formData: Invoice) => mutate({ ...data, ...formData })}
      isPending={isPending}
      isSuccess={isSuccess}
      mark={data.mark}
    />
  );
}
