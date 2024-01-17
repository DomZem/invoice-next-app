import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full rounded border-[1px] border-softLavender px-5 py-4 text-heading-s-variant text-starlessNight outline-primaryHover disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkRoyalBlue dark:bg-midnightBlue dark:text-white',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export { Input };
