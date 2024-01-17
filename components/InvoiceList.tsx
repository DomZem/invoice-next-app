import { FetchInvoice } from '@/types';
import { InvoiceListItem } from './InvoiceListItem';

interface InvoiceListProps {
  invoices: FetchInvoice[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  return (
    <ul className="flex flex-1 flex-col gap-4 overflow-y-auto">
      {invoices.map((invoice) => (
        <InvoiceListItem invoice={invoice} key={invoice.mark} />
      ))}
    </ul>
  );
}
