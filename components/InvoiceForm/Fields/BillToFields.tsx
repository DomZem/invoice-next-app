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

export default function BillToFields() {
  const { control } = useFormContext<Invoice>();

  return (
    <section className="my-10 grid gap-6">
      <p className="heading-s-variant-text text-primary">Bill to</p>

      <FormField
        control={control}
        name="clientName"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Client’s Name</FormLabel>
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
        name="clientEmail"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Client’s Email</FormLabel>
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
              <FormLabel>Street Address</FormLabel>
              <FormMessage />
            </div>

            <FormControl>
              <FormInput {...field} data-testid="billToStreetAddress" />
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
                <FormLabel>City</FormLabel>
                <FormMessage />
              </div>

              <FormControl>
                <FormInput {...field} data-testid="billToCity" />
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
                <FormLabel>Post Code</FormLabel>
                <FormMessage />
              </div>

              <FormControl>
                <FormInput {...field} data-testid="billToPostCode" />
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
                <FormLabel>Country</FormLabel>
                <FormMessage />
              </div>

              <FormControl>
                <FormInput {...field} data-testid="billToCountry" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}
