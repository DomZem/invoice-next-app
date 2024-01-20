import {
  Invoice,
  Item,
  invoiceFormSchema,
} from '@/components/InvoiceForm/formSchema';
import { Form } from '@/components/UI/Form';
import { Sheet } from '@/components/UI/Sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface InvoiceFormProviderProps {
  children: React.ReactNode;
  items: Item[];
  onSubmit: () => void;
}

export const InvoiceFormProvider = ({
  children,
  items,
  onSubmit,
}: InvoiceFormProviderProps) => {
  const form = useForm<Invoice>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      date: new Date(),
      status: 'PENDING',
      paymentTerm: 'NET_7',
      projectDescription: '',
      billFromAddress: {
        streetName: '',
        city: '',
        postCode: '',
        country: '',
      },
      billToAddress: {
        streetName: '',
        city: '',
        postCode: '',
        country: '',
      },
      items,
    },
  });

  return (
    <Sheet>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      </Form>
    </Sheet>
  );
};
