import Logo from '@/public/logo.svg';
import Image from 'next/image';
import { MdLogout } from 'react-icons/md';
import ModeToggle from './UI/ModeToggle';
import UserImage from './UserImage';

export default function AppHeader() {
  return (
    <header className="z-50 flex items-center justify-between bg-midnightBlue lg:flex-col lg:rounded-r-[20px]">
      <section className="logo h-full w-[72px] rounded-r-[20px] bg-primary md:w-20 lg:h-[103px] lg:w-full">
        <Image
          className="absolute left-1/2 top-1/2 z-10 w-7 -translate-x-1/2 -translate-y-1/2 md:w-[30px] lg:w-10"
          src={Logo}
          alt="logo"
        />
      </section>
      <section className="flex h-full lg:h-auto lg:w-full lg:flex-col">
        <ul className="flex lg:flex-col">
          <li className="flex items-center justify-center p-4 md:p-6">
            <ModeToggle />
          </li>
          <li className="flex items-center justify-center p-4 md:p-6">
            <MdLogout className="action-button" />
          </li>
        </ul>
        <div className="flex h-full items-center justify-center border-l border-[#494E6E] p-6 md:p-8 lg:border-l-0 lg:border-t lg:p-6">
          <UserImage />
        </div>
      </section>
    </header>
  );
}
