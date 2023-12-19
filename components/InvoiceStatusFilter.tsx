import { capitalizeFirstLetter } from "@/lib/utils";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { STATUS, Status } from "./InvoiceForm/formSchema";
import { Checkbox } from "./ui/Checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

interface InvoiceStatusFilterProps {
  selectedStatuses: Status[];
  handleCheckboxClick: (status: Status) => void;
}

export default function InvoiceStatusFilter({
  selectedStatuses,
  handleCheckboxClick,
}: InvoiceStatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <PopoverTrigger className="flex gap-3">
        <p className="heading-s-variant-text text-starlessNight dark:text-white md:hidden">
          Filter by
        </p>
        <p className="heading-s-variant-text hidden text-starlessNight dark:text-white md:block">
          Filter by status
        </p>
        <FaChevronDown
          className={`text-primary duration-200 ${isOpen && "rotate-180"} `}
        />
      </PopoverTrigger>
      <PopoverContent className="mt-[22px] dark:bg-darkRoyalBlue">
        <ul className="flex flex-col gap-4 p-6 pr-[88px]">
          {STATUS.map((value) => (
            <li className="flex items-center gap-[13px]" key={value}>
              <Checkbox
                id={value}
                checked={selectedStatuses.includes(value)}
                onClick={() => handleCheckboxClick(value)}
              />
              <label
                htmlFor={value}
                className="heading-s-variant-text text-starlessNight dark:text-white"
              >
                {capitalizeFirstLetter(value)}
              </label>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
