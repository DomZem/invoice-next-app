import * as z from 'zod';

const msg = {
  message: "Can't be empty",
};

const getSecondErrorMessage = (maxCharacters: number) => {
  return {
    message: `Can't be longer than ${maxCharacters} characters`,
  };
};

const addressFormSchema = z.object({
  streetName: z.string().min(1, msg).max(100, getSecondErrorMessage(100)),
  city: z.string().min(1, msg).max(50, getSecondErrorMessage(50)),
  postCode: z.string().min(1, msg).max(10, getSecondErrorMessage(10)),
  country: z.string().min(1, msg).max(50, getSecondErrorMessage(50)),
});

export const itemFormSchema = z.object({
  name: z.string().min(1, msg).max(50, getSecondErrorMessage(50)),
  quantity: z.number().positive(),
  price: z.number().positive().multipleOf(0.01),
});

const PAYMENT_TERMS = ['NET_1', 'NET_7', 'NET_14', 'NET_30'] as const;
export const STATUS = ['DRAFT', 'PENDING', 'PAID'] as const;

const zPaymentType = z.enum(PAYMENT_TERMS);
const zStatusType = z.enum(STATUS);

export const invoiceFormSchema = z.object({
  clientName: z.string().min(1, msg).max(50, getSecondErrorMessage(50)),
  clientEmail: z.string().email(),
  date: z.date(),
  status: zStatusType,
  paymentTerm: zPaymentType,
  projectDescription: z.string().min(1, msg).max(100),
  items: z.array(itemFormSchema).min(1),
  billFromAddress: addressFormSchema,
  billToAddress: addressFormSchema,
});

export const defaultValues: Invoice = {
  clientName: '',
  clientEmail: '',
  date: new Date(),
  status: 'PENDING',
  paymentTerm: 'NET_7',
  projectDescription: '',
  billFromAddress: {
    streetName: '',
    city: '',
    postCode: '',
    country: '',
  },
  billToAddress: {
    streetName: '',
    city: '',
    postCode: '',
    country: '',
  },
  items: [
    {
      name: '',
      price: 0,
      quantity: 0,
    },
  ],
};

export type Invoice = z.infer<typeof invoiceFormSchema>;

export type Status = z.infer<typeof zStatusType>;

export type PaymentTerm = z.infer<typeof zPaymentType>;

export type Item = z.infer<typeof itemFormSchema>;
