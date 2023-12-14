import CreateInvoice from "@/components/InvoiceForm/CreateInvoice";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";

export default function InvoicePage() {
  return (
    <main className="mx-auto flex w-full max-w-[730px] flex-col gap-8 overflow-hidden px-6 py-9 md:gap-[55px] md:px-12 md:py-[62px] lg:gap-16 lg:py-[78px]">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="heading-m-text md:heading-l-text text-starlessNight dark:text-white">
            Invoices
          </h1>
          <p>No invoices</p>
        </div>

        <div className="flex items-center gap-[18px]">
          <Sheet>
            <Button asChild>
              <SheetTrigger>New</SheetTrigger>
            </Button>
            <SheetContent
              side="left"
              className="top-[72px] h-[calc(100%-72px)] w-full max-w-[616px] md:top-20 md:h-[calc(100%-5rem)] md:max-w-[719px] md:rounded-r-[20px] lg:top-0 lg:h-full"
            >
              <CreateInvoice />
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </main>
  );
}
