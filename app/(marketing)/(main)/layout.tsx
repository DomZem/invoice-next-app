import { Button } from '@/components/UI/Button';
import ModeToggle from '@/components/UI/ModeToggle';
import Logo from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <header className="bg-midnightBlue fixed left-0 top-0 h-[72px] w-full md:h-20">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-md p-3">
              <Image className="w-7 md:w-[30px]" src={Logo} alt="logo" />
            </div>
            <h1 className="text-heading-m text-white">Invoice</h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
