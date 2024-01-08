"use client";

import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { MdCalendarToday } from "react-icons/md";
import { Calendar } from "../ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import ItemsFieldArray from "./ItemsFieldArray";
import SubmitButtons from "./SubmitButtons";
import { Invoice, invoiceFormSchema } from "./formSchema";

interface InvoiceFormTemplateProps {
  variant: "create" | "update";
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

    if (isSuccess && variant === "create") {
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
          {variant === "create" ? (
            "New Invoice"
          ) : (
            <span>
              Edit <span className="text-heatherGray">#</span>
              {mark}
            </span>
          )}
        </h2>

        {/* Form inputs */}
        <div className="flex-1 overflow-hidden p-4 md:p-10 md:py-[30px]">
          <div className="h-full overflow-y-auto p-2 md:p-4">
            <section className="grid gap-6">
              <p className="heading-s-variant-text text-primary">Bill from</p>

              <FormField
                control={methods.control}
                name="billFromAddress.streetName"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Street address</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <FormInput
                        {...field}
                        data-testid="billFromStreetAddress"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <FormField
                  control={methods.control}
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
                  control={methods.control}
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
                  control={methods.control}
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

            <section className="my-10 grid gap-6">
              <p className="heading-s-variant-text text-primary">Bill to</p>

              <FormField
                control={methods.control}
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
                control={methods.control}
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
                control={methods.control}
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
                  control={methods.control}
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
                  control={methods.control}
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
                  control={methods.control}
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

            <section className="grid gap-6 md:grid-cols-2">
              <FormField
                control={methods.control}
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

              <FormField
                control={methods.control}
                name="paymentTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Terms</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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

              <FormField
                control={methods.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem className="md:col-span-full">
                    <div className="flex items-center justify-between">
                      <FormLabel>Project Description</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <FormInput {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </section>

            <section className="mt-[69px]">
              <p className="mb-[22px] text-[18px] font-bold leading-[177.778%] tracking-[-0.375px] text-[#777F98]">
                Item List
              </p>
              <ItemsFieldArray />
            </section>
          </div>
        </div>

        <SubmitButtons
          variant={variant}
          isPending={isPending}
          onSaveSubmit={methods.handleSubmit((data) => {
            onSubmit({ ...data, status: "DRAFT" });
            if (isSuccess) {
              methods.reset();
            }
          })}
        />
      </form>
    </Form>
  );
}
