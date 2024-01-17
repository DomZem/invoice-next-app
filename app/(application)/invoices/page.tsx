import CreateInvoice from '@/components/InvoiceForm/CreateInvoice';
import { defaultValues } from '@/components/InvoiceForm/formSchema';

export default function InvoicesPage() {
  return (
    <main>
      <h1>Invoices page</h1>
      <CreateInvoice defaultValues={defaultValues} />
    </main>
  );
}
