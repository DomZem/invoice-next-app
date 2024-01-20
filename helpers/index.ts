import { FetchInvoice } from '@/types';

export const getFetchedInvoice = (): FetchInvoice => ({
  id: 1,
  mark: 'HDJ293',
  date: new Date(),
  clientName: 'Paul Walker',
  clientEmail: 'paul.walker@gmai.com',
  status: 'PENDING',
  paymentTerm: 'NET_14',
  projectDescription: 'New website',
  billFromAddress: {
    streetName: '123 Main St',
    city: 'Cityville',
    postCode: '12345',
    country: 'Countryland',
  },
  billToAddress: {
    streetName: '456 Park Ave',
    city: 'Townsville',
    postCode: '67890',
    country: 'Countryland',
  },
  items: [
    {
      name: 'Logo',
      price: 99.99,
      quantity: 1,
    },
  ],
});
