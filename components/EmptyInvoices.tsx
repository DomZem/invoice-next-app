import image from "@/public/invoices-empty.svg";
import Image from "next/image";

interface EmptyInvoicesProps {
  children?: React.ReactNode;
}

export default function EmptyInvoices({ children }: EmptyInvoicesProps) {
  return (
    <section className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-[42px] md:gap-[66px]">
        <Image src={image} alt="empty invoices" />
        <div className="text-center">
          <h2 className="heading-m-text mb-[23px] text-starlessNight dark:text-white">
            There is nothing here
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
