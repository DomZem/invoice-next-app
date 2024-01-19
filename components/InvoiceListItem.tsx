import { getPaymentTermDays, getTotalInvoicePrice } from '@/lib/utils';
import { FetchInvoice } from '@/types';
import { format } from 'date-fns';
import add from 'date-fns/add';
import Link from 'next/link';
import InvoiceStatus from './InvoiceStatus';

interface InvoiceListItemProps {
  invoice: FetchInvoice;
}

export function InvoiceListItem({
  invoice: { id, mark, clientName, items, date, status, paymentTerm },
}: InvoiceListItemProps) {
  return (
    <Link href={`/invoices/${id}`}>
      <li className="cursor-pointer rounded-lg bg-white p-6 shadow-wrapper dark:bg-midnightBlue md:px-6 md:py-4 lg:px-8">
        {/* Render on mobile */}
        <div className="flex flex-col gap-6 md:hidden">
          <section className="flex items-center justify-between">
            <h3 className="text-heading-s-variant text-starlessNight dark:text-white">
              <span className="text-bluebellGray">#</span>
              {mark}
            </h3>
            <p>{clientName}</p>
          </section>
          <section className="flex items-center justify-between">
            <div>
              <p>Due {format(new Date(date), 'd LLL y')}</p>
              <p className="mt-[9px] text-heading-s text-starlessNight dark:text-white">
                £ {getTotalInvoicePrice(items).toFixed(2)}
              </p>
            </div>
            <InvoiceStatus status={status} />
          </section>
        </div>

        {/* Render on desktop/tablet */}
        <div className="hidden items-center justify-between md:flex">
          <section className="flex items-center gap-7">
            <h3 className="text-heading-s-variant text-starlessNight dark:text-white">
              <span className="text-bluebellGray">#</span>
              {mark}
            </h3>
            <p>
              Due{' '}
              {format(
                add(new Date(date), {
                  days: getPaymentTermDays(paymentTerm),
                }),
                'd LLL y',
              )}
            </p>
          </section>
          <p>{clientName}</p>
          <section className="flex items-center">
            <p className="mr-10 text-heading-s text-starlessNight dark:text-white">
              £ {getTotalInvoicePrice(items).toFixed(2)}
            </p>
            <InvoiceStatus status={status} />
          </section>
        </div>
      </li>
    </Link>
  );
}
