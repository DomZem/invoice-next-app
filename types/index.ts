import { Invoice } from '@/components/InvoiceForm/formSchema';

export type FetchInvoice = Invoice & {
  mark: string;
  id: number;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  createdAt: Date;
};
