import { Button } from "@/components/ui/Button";
import ModeToggle from "@/components/ui/ModeToggle";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header className="fixed left-0 top-0 h-[72px] w-full bg-midnightBlue md:h-20">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary p-3">
              <Image className="w-7 md:w-[30px]" src={Logo} alt="logo" />
            </div>
            <h1 className="heading-m-text text-white">Invoice</h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button asChild>
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
