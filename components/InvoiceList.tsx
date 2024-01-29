import { formatList } from '@/lib/utils';
import { FetchInvoice } from '@/types';

import InvoiceEmpty from './InvoiceEmpty';
import { Status } from './InvoiceForm/formSchema';
import { InvoiceListItem } from './InvoiceListItem';

interface InvoiceListProps {
  invoices: FetchInvoice[];
  statuses: Status[];
}

export default function InvoiceList({ invoices, statuses }: InvoiceListProps) {
  let result = (
    <InvoiceEmpty>
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
    </InvoiceEmpty>
  );

  if (invoices.length) {
    result = (
      <ul className="flex flex-1 flex-col gap-4 overflow-y-auto p-1">
        {invoices.map((invoice) => (
          <InvoiceListItem invoice={invoice} key={invoice.mark} />
        ))}
      </ul>
    );
  }

  return result;
}
