'use client';

import { Button } from '@/components/UI/Button';
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/UI/Form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { Invoice } from '../formSchema';

export default function ItemsFieldArray() {
  const { control, watch } = useFormContext<Invoice>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <section className="mt-[69px]">
      <p className="mb-[22px] text-[18px] font-bold leading-[177.778%] tracking-[-0.375px] text-[#777F98]">
        Item List
      </p>
      <div>
        <ul className="mb-12 grid gap-[49px]">
          {fields.map((item, index) => {
            const price = watch(`items.${index}.price`);
            const quantity = watch(`items.${index}.quantity`);

            return (
              <li
                className="grid grid-cols-[minmax(64px,1fr)_minmax(100px,1fr)_1fr_auto] gap-x-4 gap-y-6 md:grid-cols-[214px_46px_100px_1fr_auto]"
                key={item.id}
              >
                <FormField
                  control={control}
                  name={`items.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="col-span-full md:col-span-1">
                      <div className="flex items-center justify-between">
                        <FormLabel>item name</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <FormInput {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>qty.</FormLabel>
                      <FormControl>
                        <FormInput
                          {...field}
                          className="px-0 text-center"
                          type="number"
                          onChange={(e) => {
                            field.onChange(parseInt(e.target.value) || '');
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`items.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>price</FormLabel>
                      <FormControl>
                        <FormInput
                          {...field}
                          type="number"
                          step="0.01"
                          onChange={(e) => {
                            field.onChange(parseFloat(e.target.value) || '');
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div>
                  <p className="text-label">total</p>
                  <div className="mt-[9px] py-4 text-heading-s-variant">
                    <p className="overflow-hidden text-clip">
                      {(price * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-[23px] flex items-center justify-center">
                  <button
                    className="p-2 duration-200 hover:text-destructive"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <BiSolidTrashAlt className="text-lg" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <Button
          className="w-full"
          type="button"
          variant="ghost"
          onClick={() =>
            append({
              name: '',
              quantity: 0,
              price: 0,
            })
          }
        >
          Add New Item
        </Button>
      </div>
    </section>
  );
}
