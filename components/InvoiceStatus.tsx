import { capitalizeFirstLetter } from '@/lib/utils';
import { Status } from './InvoiceForm/formSchema';

interface InvoiceStatusProps {
  status: Status;
}

export default function InvoiceStatus({ status }: InvoiceStatusProps) {
  const isDraft = status === 'DRAFT';
  const isPending = status === 'PENDING';
  const isPaid = status === 'PAID';

  return (
    <div
      className={`flex h-10 w-[104px] items-center justify-center gap-2 rounded-md 
      ${isDraft && 'dark:bg-softLavender/5 bg-[#373b53]'} 
      ${isPending && 'bg-[#FF8F00]'} 
      ${isPaid && 'bg-[#33D69F]'} bg-opacity-5`}
    >
      {/* Dot */}
      <div
        className={`h-2 w-2 rounded-full  
        ${isDraft && 'bg-[#373b53] dark:bg-softLavender'} 
        ${isPending && 'bg-[#FF8F00]'} 
        ${isPaid && 'bg-[#33D69F]'}`}
      ></div>
      <p
        className={`text-heading-s-variant
        ${isDraft && 'text-[#373b53] dark:text-softLavender'} 
        ${isPending && 'text-[#FF8F00]'} 
        ${isPaid && 'text-[#33D69F]'}
         `}
      >
        {capitalizeFirstLetter(status)}
      </p>
    </div>
  );
}
