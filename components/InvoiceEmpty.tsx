import invoiceEmpty from '@/public/invoice-empty.svg';
import Image from 'next/image';

interface InvoiceEmptyProps {
  children?: React.ReactNode;
}

export default function InvoiceEmpty({ children }: InvoiceEmptyProps) {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-[42px] md:gap-[66px]">
        <Image src={invoiceEmpty} alt="empty invoices" />
        <div className="text-center">
          <h2 className="mb-[23px] text-heading-m text-starlessNight dark:text-white">
            There is nothing here
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
