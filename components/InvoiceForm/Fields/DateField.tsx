import { Calendar } from '@/components/UI/Calendar';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/UI/Form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/Popover';
import { format } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import { MdCalendarToday } from 'react-icons/md';
import { Invoice } from '../formSchema';

interface DateFieldProps {
  variant: 'create' | 'update';
}

export default function DateField({ variant }: DateFieldProps) {
  const { control } = useFormContext<Invoice>();

  return (
    <FormField
      control={control}
      name="date"
      disabled={variant === 'update'}
      shouldUnregister={variant === 'update'}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>invoice date</FormLabel>
          <Popover>
            <PopoverTrigger disabled={variant === 'update'} asChild>
              <FormControl>
                <button className="flex rounded border-[1px] border-softLavender px-5 py-4 text-heading-s-variant text-starlessNight outline-primaryHover disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkRoyalBlue dark:bg-midnightBlue dark:text-white">
                  {field.value ? (
                    format(new Date(field.value), 'd LLL y')
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <MdCalendarToday className="ml-auto" />
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="popover-content max-w-xs">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
