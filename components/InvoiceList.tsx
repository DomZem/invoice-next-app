import { FetchInvoice } from "@/types";
import { InvoiceListItem } from "./InvoiceListItem";

interface InvoiceListProps {
  invoicesList: FetchInvoice[];
}

export default function InvoiceList({ invoicesList }: InvoiceListProps) {
  return (
    <ul className="flex flex-col gap-4 overflow-y-auto">
      {invoicesList.map((invoice) => (
        <InvoiceListItem invoice={invoice} key={invoice.id} />
      ))}
    </ul>
  );
}
