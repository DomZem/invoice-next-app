"use client";

import { axiosInstance } from "@/lib/axios";
import { generateRandomString } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Status } from "./InvoiceForm/formSchema";
import { Button } from "./ui/Button";

interface InvoiceMarkButtonProps {
  id: number;
  status: Status;
}

const updateInvoiceStatus = async ({
  id,
  status,
}: {
  id: number;
  status: Status;
}) => {
  return axiosInstance.patch(
    `/invoice/${id}`,
    { status },
    {
      withCredentials: true,
    },
  );
};

export default function InvoiceMarkButton({
  id,
  status,
}: InvoiceMarkButtonProps) {
  const queryClient = useQueryClient();

  const nextStatus: Status =
    status === "DRAFT" ? "PENDING" : status === "PENDING" ? "PAID" : "DRAFT";

  const { mutate, isPending } = useMutation({
    mutationFn: updateInvoiceStatus,
    onSuccess: () => {
      const toastId = generateRandomString();
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      toast.success(
        `Invoice status has been updated to ${nextStatus.toLowerCase()} 🔥`,
        { id: toastId },
      );
    },
    onError: (error) => {
      const toastId = generateRandomString();
      toast.error(
        `Something went wrong. Invoice status hasn't been updated ${error.name}`,
        {
          id: toastId,
        },
      );
    },
  });

  const handleUpdateInvoiceStatus = () => {
    mutate({ id, status: nextStatus });
  };

  return (
    <Button
      className="truncate"
      disabled={isPending}
      onClick={handleUpdateInvoiceStatus}
    >
      Mark as{" "}
      {status === "DRAFT" ? "Pending" : status === "PENDING" ? "Paid" : "Draft"}
    </Button>
  );
}
