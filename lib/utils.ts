import { Item, PaymentTerm } from "@/components/InvoiceForm/formSchema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalizeFirstLetter = (inputString: string): string => {
  const firstLetter = inputString.charAt(0).toUpperCase();
  const restOfString = inputString.slice(1).toLowerCase();

  return `${firstLetter}${restOfString}`;
};

export const getTotalInvoicePrice = (items: Item[]) => {
  return items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
};

export const generateRandomString = (): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomString = Array.from(
    { length: 2 },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join("");
  const randomNumber = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return randomString + randomNumber;
};

export const getPaymentTermDays = (paymentTerm: PaymentTerm): number => {
  switch (paymentTerm) {
    case "NET_1":
      return 1;
    case "NET_7":
      return 7;
    case "NET_14":
      return 14;
    case "NET_30":
      return 30;
    default:
      return 0;
  }
};
