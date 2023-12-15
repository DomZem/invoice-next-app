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

  let toastId: string = "invoice";

  const { mutate } = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success("Invoice has been created 🔥", { id: toastId });
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        toast.error(`Something went wrong. ${err.response?.data.message}`, {
          id: toastId,
        });
      } else {
        toast.error("Something went wrong. Invoice hasn't been created", {
          id: toastId,
        });
      }
    },
  });

  const handleCreateInvoice = (data: Invoice) => {
    toast.loading(`Creating invoice`, { id: toastId });
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
