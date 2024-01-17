'use client';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import * as React from 'react';
import { DateFormatter, DayPicker } from 'react-day-picker';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const formatCaption: DateFormatter = (date, options) => {
  return format(date, 'LLL yyy', { locale: options?.locale });
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'px-5 py-7 text-heading-s-variant text-starlessNight dark:text-softLavender',
        className,
      )}
      classNames={{
        months: '',
        month: 'space-y-4',
        caption: 'flex justify-center relative items-center',
        caption_label: '',
        nav: 'space-x-1 flex items-center',
        nav_button: 'text-primary hover:text-primaryHover duration-200',
        nav_button_previous: 'absolute left-0',
        nav_button_next: 'absolute right-0',
        table: 'w-full border-collapse space-y-8',
        head_row: '',
        head_cell: '',
        row: 'flex mt-4',
        cell: 'text-center flex-1 p-0',
        day: 'hover:text-primary duration-200',
        day_range_end: 'day-range-end',
        day_selected: 'text-primary',
        day_today: '',
        day_outside: 'day-outside opacity-[0.08] aria-selected:opacity-75',
        day_disabled: 'opacity-[0.08]',
        day_range_middle: '',
        day_hidden: 'invisible',
        ...classNames,
      }}
      hideHead
      formatters={{ formatCaption }}
      components={{
        IconLeft: ({ ...props }) => <IoChevronBackOutline />,
        IconRight: ({ ...props }) => <IoChevronForwardOutline />,
      }}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

export { Calendar };
