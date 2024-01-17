import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/UI/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/Select';
import { useFormContext } from 'react-hook-form';
import { Invoice } from '../formSchema';

export default function PaymentTermSelect() {
  const { control } = useFormContext<Invoice>();

  return (
    <FormField
      control={control}
      name="paymentTerm"
      render={({ field }) => (
        <FormItem>
          <FormLabel>payment terms</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select payment term" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="NET_1">Net 1 Day</SelectItem>
              <SelectSeparator />
              <SelectItem value="NET_7">Net 7 Days</SelectItem>
              <SelectSeparator />
              <SelectItem value="NET_14">Net 14 Days</SelectItem>
              <SelectSeparator />
              <SelectItem value="NET_30">Net 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
