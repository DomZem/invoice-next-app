"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import InvoiceFormTemplate from "./InvoiceFormTemplate";
import { Invoice } from "./formSchema";

const defaultValues: Invoice = {
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
  items: [
    {
      name: "",
      price: 0,
      quantity: 1,
    },
  ],
};

const createInvoice = async (data: Invoice) => {
  return axiosInstance.post("/invoice", data, { withCredentials: true });
};

export default function CreateInvoice() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: Invoice) =>
      toast.promise(createInvoice(data), {
        loading: "Creating invoice ...",
        success: `Invoice for ${data.clientName} has been created 🔥`,
        error: (error: Error | AxiosError) => {
          let message = "Something went wrong. Invoice hasn't been created";

          if (axios.isAxiosError(error)) {
            return `${message}. Error: ${error.response?.data.message}`;
          }

          return message;
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
  });

  const handleCreateInvoice = (data: Invoice) => {
    mutate(data);
  };

  return (
    <InvoiceFormTemplate
      variant="create"
      defaultValues={defaultValues}
      onSubmit={handleCreateInvoice}
    />
  );
}
