import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import { Invoice } from "../formSchema";

export default function BillFromFields() {
  const { control } = useFormContext<Invoice>();

  return (
    <section className="grid gap-6">
      <p className="heading-s-variant-text text-primary">Bill from</p>

      <FormField
        control={control}
        name="billFromAddress.streetName"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Street address</FormLabel>
              <FormMessage />
            </div>

            <FormControl>
              <FormInput {...field} data-testid="billFromStreetAddress" />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        <FormField
          control={control}
          name="billFromAddress.city"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>City</FormLabel>
                <FormMessage />
              </div>

              <FormControl>
                <FormInput {...field} data-testid="billFromCity" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="billFromAddress.postCode"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Post Code</FormLabel>
                <FormMessage />
              </div>

              <FormControl>
                <FormInput {...field} data-testid="billFromPostCode" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="billFromAddress.country"
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-1">
              <div className="flex items-center justify-between">
                <FormLabel>Country</FormLabel>
                <FormMessage />
              </div>

              <FormControl>
                <FormInput {...field} data-testid="billFromCountry" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
