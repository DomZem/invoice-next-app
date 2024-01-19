'use client';

import GoBackButton from '@/components/GoBackButton';
import InvoiceDetailsActions from '@/components/InvoiceDetailsActions';
import InvoiceError from '@/components/InvoiceError';
import InvoiceStatus from '@/components/InvoiceStatus';
import Loading from '@/components/UI/Loading';
import { axiosInstance } from '@/lib/axios';
import { getPaymentTermDays, getTotalInvoicePrice } from '@/lib/utils';
import { FetchInvoice } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import add from 'date-fns/add';

const fetchInvoiceById = async (id: string): Promise<FetchInvoice> => {
  const response = await axiosInstance.get<FetchInvoice>(`/invoice/${id}`, {
    withCredentials: true,
  });

  return response.data;
};

interface InvoiceDetailsProps {
  params: {
    id: string;
  };
}

export default function InvoiceDetails({ params }: InvoiceDetailsProps) {
  const { id } = params;

  const { data, isLoading, error } = useQuery<FetchInvoice>({
    queryFn: () => fetchInvoiceById(id),
    queryKey: ['invoices', id],
  });

  if (isLoading) {
    return (
      <main className="flex items-center justify-center">
        <Loading />
      </main>
    );
  }

  if (error || !data) {
    let message = 'Try maybe later!';

    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.message;
      message = `Error: ${errorMessage}. ` + message;
    }

    return (
      <main className="flex items-center justify-center">
        <div className="max-w-[730px] px-6 md:px-10">
          <InvoiceError>
            <p>{message}</p>
          </InvoiceError>
        </div>
      </main>
    );
  }

  return (
    <main className="relative h-full overflow-hidden">
      <div className="mx-auto h-full max-w-[730px] overflow-y-auto px-6 py-[147px] pt-[33px] md:px-10 md:py-[49px] lg:py-[65px]">
        <GoBackButton />

        <section className="mb-4 mt-[31px] rounded-lg bg-white p-6 shadow-wrapper dark:bg-midnightBlue md:mb-6 md:flex md:items-center md:justify-between md:px-8 md:pt-5">
          <div className="flex items-center justify-between md:gap-5">
            <p>Status</p>
            <InvoiceStatus status={data.status} />
          </div>
          <div className="hidden md:block">
            <InvoiceDetailsActions data={data} />
          </div>
        </section>

        <section className="rounded-lg bg-white p-6 shadow-wrapper dark:bg-midnightBlue md:p-8">
          <div className="flex flex-col gap-[30px] md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="mb-1 text-heading-s-variant text-starlessNight dark:text-white">
                <span className="text-bluebellGray">#</span>
                {data.mark}
              </h3>
              <p>{data.projectDescription}</p>
            </div>
            <div>
              <p>{data.billFromAddress.streetName}</p>
              <p>{data.billFromAddress.city}</p>
              <p>{data.billFromAddress.postCode}</p>
              <p>{data.billFromAddress.country}</p>
            </div>
          </div>

          <div className="mb-[38px] mt-[31px] flex flex-col gap-8 md:mb-[47px] md:mt-[21px] md:flex-row md:gap-[118px]">
            <div className="flex gap-[61px]">
              <div className="flex flex-col gap-[31px]">
                <div>
                  <p>Invoice Date</p>
                  <p className="text-invoice-detail">
                    {format(new Date(data.date), 'd LLL Y')}
                  </p>
                </div>
                <div>
                  <p>Payment Due</p>
                  <p className="text-invoice-detail">
                    {format(
                      add(new Date(data.date), {
                        days: getPaymentTermDays(data.paymentTerm),
                      }),
                      'd LLL y',
                    )}
                  </p>
                </div>
              </div>
              <div>
                <p>Bill To</p>
                <p className="mb-[7px] text-invoice-detail">
                  {data.clientName}
                </p>
                <p>{data.billToAddress.streetName}</p>
                <p>{data.billToAddress.city}</p>
                <p>{data.billToAddress.postCode}</p>
                <p>{data.billToAddress.country}</p>
              </div>
            </div>

            <div>
              <p>Sent to</p>
              <p className="text-invoice-detail">{data.clientEmail}</p>
            </div>
          </div>

          <div>
            <ul className="flex flex-col gap-6 rounded-t-lg bg-[#F9FAFE] p-6 dark:bg-darkRoyalBlue md:hidden">
              {data.items.map(({ name, quantity, price }) => (
                <li
                  className="flex items-center justify-between text-heading-s-variant text-starlessNight dark:text-white"
                  key={name}
                >
                  <div>
                    <p>{name}</p>
                    <p className="mt-2 text-bluebellGray">
                      {quantity} x £ {price.toFixed(2)}
                    </p>
                  </div>
                  <p>£ {(quantity * price).toFixed(2)}</p>
                </li>
              ))}
            </ul>
            <div className="hidden rounded-t-lg bg-[#F9FAFE] p-8 dark:bg-darkRoyalBlue md:block">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-medium">Item Name</th>
                    <th className="font-medium">QTY.</th>
                    <th className="text-right font-medium">Price</th>
                    <th className="text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map(({ name, quantity, price }) => (
                    <tr className="text-heading-s-variant" key={name}>
                      <td className="pt-8 text-starlessNight dark:text-white">
                        {name}
                      </td>
                      <td className="pt-8 text-center">{quantity}</td>
                      <td className="pt-8 text-right">£ {price.toFixed(2)}</td>
                      <td className="pt-8 text-right text-starlessNight dark:text-white">
                        £ {(quantity * price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between rounded-b-lg bg-[#373B53] p-6 text-white dark:bg-starlessNight">
              <p className="text-body">Grand Total</p>
              <p className="text-[24px] font-bold leading-8 tracking-[-0.5px]">
                £ {getTotalInvoicePrice(data.items).toFixed(2)}
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="absolute bottom-0 flex w-full justify-center bg-white px-6 py-5 dark:bg-midnightBlue md:hidden">
        <InvoiceDetailsActions data={data} />
      </section>
    </main>
  );
}
