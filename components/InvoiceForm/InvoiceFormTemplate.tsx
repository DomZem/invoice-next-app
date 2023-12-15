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
import { Button } from "../ui/Button";
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
import { SheetClose } from "../ui/Sheet";
import ItemsFieldArray from "./ItemsFieldArray";
import { Invoice, invoiceFormSchema } from "./formSchema";

interface InvoiceFormTemplateProps {
  variant: "create" | "update";
  defaultValues: Invoice;
  onSubmit: (data: Invoice) => void;
  mark?: string;
}

export default function InvoiceFormTemplate({
  variant,
  defaultValues,
  onSubmit,
  mark,
}: InvoiceFormTemplateProps) {
  const methods = useForm<Invoice>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: Invoice) => {
    onSubmit(data);

    // if (variant === "add") {
    //   methods.reset();
    // }
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
                      <FormInput {...field} />
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
                        <FormInput {...field} />
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
                        <FormInput {...field} />
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
                        <FormInput {...field} />
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
                      <FormInput {...field} />
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
                        <FormInput {...field} />
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
                        <FormInput {...field} />
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
                        <FormInput {...field} />
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
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Invoice date</FormLabel>
                    <Popover>
                      <PopoverTrigger disabled={variant === "update"} asChild>
                        <FormControl>
                          <button className="heading-s-variant-text flex w-full rounded border-[1px] border-softLavender px-5 py-4 text-starlessNight outline-primaryHover dark:border-darkRoyalBlue dark:bg-midnightBlue dark:text-white">
                            {field.value ? (
                              format(new Date(field.value), "d LLL Y")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <MdCalendarToday className="ml-auto" />
                          </button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent>
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

        {/* Form buttons */}
        <div className="flex-shrink-0">
          <div className="h-16 w-full bg-shadow"></div>
          <div
            className={`flex items-center gap-2 px-6 py-5 ${
              variant === "create"
                ? "justify-end md:justify-between"
                : "justify-end"
            }`}
          >
            <Button type="button" variant="secondary" asChild>
              <SheetClose>
                {variant === "create" && "Discard"}
                {variant === "update" && "Cancel"}
              </SheetClose>
            </Button>

            <div className="flex items-center gap-2">
              {/* If user submit that button the status will be 'DRAFT' */}
              {variant === "create" && (
                <Button
                  onClick={methods.handleSubmit((data) =>
                    onSubmit({ ...data, status: "DRAFT" }),
                  )}
                  className="text-clip"
                  type="submit"
                  variant="outline"
                >
                  Save as Draft
                </Button>
              )}

              {/* If user submit that button the status will be 'PENDING' */}
              <Button type="submit">
                {variant === "create" && "Save & Send"}
                {variant === "update" && "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
