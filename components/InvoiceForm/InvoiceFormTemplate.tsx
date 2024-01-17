'use client';

import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/UI/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import BillFromFields from './Fields/BillFromFields';
import BillToFields from './Fields/BillToFields';
import DateField from './Fields/DateField';
import ItemsFieldArray from './Fields/ItemsFieldArray';
import PaymentTermSelect from './Fields/PaymentTermSelect';
import SubmitButtons from './Fields/SubmitButtons';
import { Invoice, invoiceFormSchema } from './formSchema';

interface InvoiceFormTemplateProps {
  variant: 'create' | 'update';
  defaultValues: Invoice;
  onSubmit: (data: Invoice) => void;
  isPending: boolean;
  isSuccess: boolean;
  mark?: string;
}

export default function InvoiceFormTemplate({
  variant,
  defaultValues,
  onSubmit,
  isPending,
  isSuccess,
  mark,
}: InvoiceFormTemplateProps) {
  const methods = useForm<Invoice>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: Invoice) => {
    onSubmit(data);

    if (isSuccess && variant === 'create') {
      methods.reset();
    }
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="flex h-full flex-col justify-between lg:pl-[103px]"
      >
        <h2 className="px-6 pt-6 text-[24px] font-bold leading-[133.333%] tracking-[-0.5px] text-starlessNight dark:text-white md:px-14 md:pt-[59px]">
          {variant === 'create' ? (
            'New Invoice'
          ) : (
            <span>
              Edit <span className="text-heatherGray">#</span>
              {mark}
            </span>
          )}
        </h2>

        <div className="flex-1 overflow-hidden p-4 md:p-10 md:py-[30px]">
          <div className="h-full overflow-y-auto p-2 md:p-4">
            <BillFromFields />

            <BillToFields />

            <section className="grid gap-6 md:grid-cols-2">
              <DateField variant={variant} />

              <PaymentTermSelect />

              <FormField
                control={methods.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem className="md:col-span-full">
                    <div className="flex items-center justify-between">
                      <FormLabel>project description</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <FormInput {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>

            <ItemsFieldArray />
          </div>
        </div>

        <SubmitButtons
          variant={variant}
          isPending={isPending}
          onSaveSubmit={methods.handleSubmit((data) => {
            onSubmit({ ...data, status: 'DRAFT' });
            if (isSuccess) {
              methods.reset();
            }
          })}
        />
      </form>
    </Form>
  );
}
