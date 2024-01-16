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
          'text-heading-s-variant border-softLavender text-starlessNight outline-primaryHover dark:border-darkRoyalBlue dark:bg-midnightBlue w-full rounded border-[1px] px-5 py-4 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white',
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
