import { formatList } from "@/lib/utils";
import { FetchInvoice } from "@/types";
import EmptyInvoices from "./EmptyInvoices";
import { Status } from "./InvoiceForm/formSchema";
import { InvoiceListItem } from "./InvoiceListItem";

interface InvoiceListProps {
  invoices: FetchInvoice[];
  statuses: Status[];
}

export default function InvoiceList({ invoices, statuses }: InvoiceListProps) {
  let result = (
    <EmptyInvoices>
      {statuses.length ? (
        <p>
          Create an invoice with status {formatList(statuses)} to display it by
          clicking the
        </p>
      ) : (
        <p>Create an invoice by clicking the</p>
      )}

      <p>
        <span className="font-bold">New</span> button and get started
      </p>
    </EmptyInvoices>
  );

  if (invoices.length) {
    result = (
      <ul className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {invoices.map((invoice) => (
          <InvoiceListItem invoice={invoice} key={invoice.mark} />
        ))}
      </ul>
    );
  }

  return result;
}
