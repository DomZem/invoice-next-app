import { capitalizeFirstLetter } from '@/lib/utils';
import { Status } from './InvoiceForm/formSchema';

interface InvoiceStatusProps {
  status: Status;
}

export default function InvoiceStatus({ status }: InvoiceStatusProps) {
  return (
    <div
      className={`flex h-10 w-[104px] items-center justify-center gap-2 rounded-md 
      ${status === 'DRAFT' && 'dark:bg-softLavender/5 bg-[#373b53]'} 
      ${status === 'PENDING' && 'bg-[#FF8F00]'} 
      ${status === 'PAID' && 'bg-[#33D69F]'} bg-opacity-5`}
    >
      {/* Dot */}
      <div
        className={`h-2 w-2 rounded-full  
        ${status === 'DRAFT' && 'bg-[#373b53] dark:bg-softLavender'} 
        ${status === 'PENDING' && 'bg-[#FF8F00]'} 
        ${status === 'PAID' && 'bg-[#33D69F]'}`}
      ></div>
      <p
        className={`text-heading-s-variant
        ${status === 'DRAFT' && 'text-[#373b53] dark:text-softLavender'} 
        ${status === 'PENDING' && 'text-[#FF8F00]'} 
        ${status === 'PAID' && 'text-[#33D69F]'}
         `}
      >
        {capitalizeFirstLetter(status)}
      </p>
    </div>
  );
}
