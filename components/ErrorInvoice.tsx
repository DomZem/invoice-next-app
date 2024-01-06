import image from "@/public/invoice-error.svg";
import Image from "next/image";

interface ErrorInvoiceProps {
  children: React.ReactNode;
}

export default function ErrorInvoice({ children }: ErrorInvoiceProps) {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-[42px] md:gap-[66px]">
        <Image src={image} alt="error invoice" priority />
        <div className="text-center">
          <h2 className="heading-m-text mb-[23px] text-starlessNight dark:text-white">
            Something went wrong
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
