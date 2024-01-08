"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";

interface InvoicePaginationProps {
  page: number;
  lastPage: number;
  invoicesLength: number;
}

export default function InvoicePagination({
  page,
  lastPage,
  invoicesLength,
}: InvoicePaginationProps) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <p className="invoice-detail-text">
        Current page: <span className="">{page}</span>
      </p>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => router.push(`/invoice?page=${--page}`)}
          disabled={page === 1 || invoicesLength === 0}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={() => router.push(`/invoice?page=${++page}`)}
          disabled={page === lastPage || invoicesLength === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
