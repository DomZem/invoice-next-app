import { Invoice } from '@/components/InvoiceForm/formSchema';

export type FetchInvoice = Invoice & {
  mark: string;
  id: number;
};
