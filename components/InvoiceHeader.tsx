import { FetchInvoice } from "@/types";

interface InvoiceHeaderProps {
  invoices: FetchInvoice[];
}

export default function InvoiceHeader({ invoices }: InvoiceHeaderProps) {
  return (
    <div>
      <h1 className="heading-m-text md:heading-l-text text-starlessNight dark:text-white">
        Invoices
      </h1>
      <p>
        {invoices.length === 0
          ? "No invoices"
          : invoices.length === 1
            ? "1 invoice"
            : `There are ${invoices.length} invoices`}
      </p>
    </div>
  );
}
