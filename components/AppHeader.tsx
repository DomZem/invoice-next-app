import Logo from "@/public/logo.svg";
import Image from "next/image";
import ModeToggle from "./ui/ModeToggle";

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
        <div className="flex items-center justify-center p-6 md:p-8">
          <ModeToggle />
        </div>
        <div className="flex h-full items-center justify-center border-l border-[#494E6E] p-6 md:p-8 lg:border-l-0 lg:border-t lg:p-6">
          <Image
            height={40}
            width={40}
            src="https://images.pexels.com/photos/10311994/pexels-photo-10311994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="h-8 w-8 rounded-full bg-slate-700 lg:h-10 lg:w-10"
            alt="user image"
          />
        </div>
      </section>
    </header>
  );
}
