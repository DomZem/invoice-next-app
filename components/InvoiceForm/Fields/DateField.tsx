import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import { MdCalendarToday } from "react-icons/md";
import { Calendar } from "../../ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/Popover";
import { Invoice } from "../formSchema";

interface DateFieldProps {
  variant: "create" | "update";
}

export default function DateField({ variant }: DateFieldProps) {
  const { control } = useFormContext<Invoice>();

  return (
    <FormField
      control={control}
      name="date"
      disabled={variant === "update"}
      shouldUnregister={variant === "update"}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Invoice date</FormLabel>
          <Popover>
            <PopoverTrigger disabled={variant === "update"} asChild>
              <FormControl>
                <button className="heading-s-variant-text flex rounded border-[1px] border-softLavender px-5 py-4 text-starlessNight outline-primaryHover disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkRoyalBlue dark:bg-midnightBlue dark:text-white">
                  {field.value ? (
                    format(new Date(field.value), "d LLL Y")
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
