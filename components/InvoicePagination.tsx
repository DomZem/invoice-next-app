import { Button } from "./ui/Button";

interface InvoicePaginationProps {
  page: number;
  lastPage: number;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
  invoicesLength: number;
}

export default function InvoicePagination({
  page,
  lastPage,
  onPreviousButtonClick,
  onNextButtonClick,
  invoicesLength,
}: InvoicePaginationProps) {
  return (
    <div className="flex items-center justify-between">
      <p className="invoice-detail-text">
        Current page: <span className="">{page}</span>
      </p>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onPreviousButtonClick}
          disabled={page === 1 || invoicesLength === 0}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={onNextButtonClick}
          disabled={page === lastPage || invoicesLength === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
