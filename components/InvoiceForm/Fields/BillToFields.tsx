import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/UI/Form';
import { useFormContext } from 'react-hook-form';
import { Invoice } from '../formSchema';

export default function BillToFields() {
  const { control } = useFormContext<Invoice>();

  return (
    <section className="my-10 grid gap-6">
      <p className="text-heading-s-variant text-primary">Bill to</p>

      <FormField
        control={control}
        name="clientName"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>client&apos;s name</FormLabel>
              <FormMessage data-testid="clientNameErrorMessage" />
            </div>

            <FormControl>
              <FormInput {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="clientEmail"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>client&apos;s email</FormLabel>
              <FormMessage />
            </div>

            <FormControl>
              <FormInput {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="billToAddress.streetName"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>street address</FormLabel>
              <FormMessage data-testid="streetAddressErrorMessage" />
            </div>

            <FormControl>
              <FormInput {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormField
          control={control}
          name="billToAddress.city"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>city</FormLabel>
                <FormMessage data-testid="cityErrorMessage" />
              </div>

              <FormControl>
                <FormInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="billToAddress.postCode"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>post code</FormLabel>
                <FormMessage data-testid="postCodeErrorMessage" />
              </div>

              <FormControl>
                <FormInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="billToAddress.country"
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-1">
              <div className="flex items-center justify-between">
                <FormLabel>country</FormLabel>
                <FormMessage data-testid="countryErrorMessage" />
              </div>

              <FormControl>
                <FormInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
