'use client';

import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const buttonVariants = cva(
  'rounded-3xl px-6 py-4 text-[15px] font-bold leading-[100%] duration-200 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primaryHover',
        secondary:
          'text-bluebellGray bg-[#F9FAFE] hover:bg-softLavender dark:bg-darkRoyalBlue dark:text-softLavender hover:dark:bg-white',
        ghost: 'bg-[#F9FAFE] text-bluebellGray hover:bg-softLavender',
        destructive: 'bg-destructive text-white hover:bg-destructiveHover',
        outline:
          'text-heatherGray bg-[#373B53] hover:dark:bg-midnightBlue hover:bg-starlessNight dark:text-softLavender',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

export { Button, buttonVariants };
