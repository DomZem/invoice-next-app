import invoiceError from '@/public/invoice-error.svg';
import Image from 'next/image';

interface InvoiceErrorProps {
  children: React.ReactNode;
}

export default function InvoiceError({ children }: InvoiceErrorProps) {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-[42px] md:gap-[66px]">
        <Image src={invoiceError} alt="error invoice" priority />
        <div className="text-center">
          <h2 className="mb-[23px] text-heading-m text-starlessNight dark:text-white">
            Something went wrong
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
