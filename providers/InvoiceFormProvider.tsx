import {
  Invoice,
  Item,
  invoiceFormSchema,
} from "@/components/InvoiceForm/formSchema";
import { Form } from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const InvoiceFormProvider = ({
  children,
  items,
}: {
  children: React.ReactNode;
  items: Item[];
}) => {
  const form = useForm<Invoice>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      date: new Date(),
      status: "PENDING",
      paymentTerm: "NET_7",
      projectDescription: "",
      billFromAddress: {
        streetName: "",
        city: "",
        postCode: "",
        country: "",
      },
      billToAddress: {
        streetName: "",
        city: "",
        postCode: "",
        country: "",
      },
      items,
    },
  });

  return (
    <Form {...form}>
      <form>{children}</form>
    </Form>
  );
};
