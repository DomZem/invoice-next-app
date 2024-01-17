import { Item, PaymentTerm } from '@/components/InvoiceForm/formSchema';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalizeFirstLetter = (inputString: string): string => {
  const firstLetter = inputString.charAt(0).toUpperCase();
  const restOfString = inputString.slice(1).toLowerCase();

  return `${firstLetter}${restOfString}`;
};

export const formatList = (items: string[]): string => {
  if (items.length === 0) {
    return '';
  } else if (items.length === 1) {
    return capitalizeFirstLetter(items[0]);
  } else {
    const formattedItems = items
      .slice(0, -1)
      .map((item) => capitalizeFirstLetter(item));
    const lastItem = capitalizeFirstLetter(items[items.length - 1]);
    return `${formattedItems.join(', ')} or ${lastItem}`;
  }
};

export const getTotalInvoicePrice = (items: Item[]) => {
  return items.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
};

export const getPaymentTermDays = (paymentTerm: PaymentTerm): number => {
  switch (paymentTerm) {
    case 'NET_1':
      return 1;
    case 'NET_7':
      return 7;
    case 'NET_14':
      return 14;
    case 'NET_30':
      return 30;
    default:
      return 0;
  }
};
