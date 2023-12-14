import { Invoice } from "@/components/InvoiceForm/formSchema";

export type FetchInvoice = Invoice & {
  id: number;
};
