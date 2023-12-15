import { axiosInstance } from "@/lib/axios";
import { FetchInvoice } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import InvoiceFormTemplate from "./InvoiceFormTemplate";
import { Invoice } from "./formSchema";

const updateInvoice = async (data: FetchInvoice) => {
  return axiosInstance.put(`/invoice/${data.id}`, data, {
    withCredentials: true,
  });
};

interface UpdateInvoiceProps {
  data: FetchInvoice;
}

export default function UpdateInvoice({ data }: UpdateInvoiceProps) {
  const queryClient = useQueryClient();

  let toastId: string = "toastId";

  const { mutate } = useMutation({
    mutationFn: updateInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success(`Invoice ${data.mark} has been updated 🔥`, {
        id: toastId,
      });
    },
    onError: (error) => {
      toast.error("Something went wrong. Invoice hasn't been updated", {
        id: toastId,
      });
    },
  });

  const handleUpdateInvoice = (formData: Invoice) => {
    toast.loading(`Upadting ${data.mark} invoice`, { id: toastId });
    mutate({ ...data, ...formData });
  };

  return (
    <InvoiceFormTemplate
      variant="update"
      defaultValues={{ ...data, date: new Date(data.date) }}
      onSubmit={handleUpdateInvoice}
      mark={data.mark}
    />
  );
}
