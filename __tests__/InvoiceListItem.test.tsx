import { InvoiceListItem } from '@/components/InvoiceListItem';
import { FetchInvoice } from '@/types';
import { render, screen } from '@testing-library/react';

const filledInvoice: FetchInvoice = {
  id: 1,
  mark: 'NXJ9292',
  date: new Date('January 27, 2024'),
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
};

describe('InvoiceListItem component', () => {
  describe('Unit', () => {
    it('should render "Due 28 Jan 2024" when date is "27.01.2024" and payment term is "NET_1"', () => {
      render(
        <InvoiceListItem
          invoice={{ ...filledInvoice, paymentTerm: 'NET_1' }}
        />,
      );

      expect(screen.getByText('Due 28 Jan 2024')).toBeInTheDocument();
    });

    it('should render "Due 3 Feb 2024" when date is "27.01.2024" and payment term is "NET_7"', () => {
      render(
        <InvoiceListItem
          invoice={{ ...filledInvoice, paymentTerm: 'NET_7' }}
        />,
      );

      expect(screen.getByText('Due 3 Feb 2024')).toBeInTheDocument();
    });

    it('should render "10 Feb 2024" when date is "27.01.2024" and payment term is "NET_14"', () => {
      render(
        <InvoiceListItem
          invoice={{ ...filledInvoice, paymentTerm: 'NET_14' }}
        />,
      );

      expect(screen.getByText('Due 10 Feb 2024')).toBeInTheDocument();
    });

    it('should render "Due 26 Feb 2024" when date is "27.01.2024" and payment term is "NET_30"', () => {
      render(
        <InvoiceListItem
          invoice={{ ...filledInvoice, paymentTerm: 'NET_30' }}
        />,
      );

      expect(screen.getByText('Due 26 Feb 2024')).toBeInTheDocument();
    });

    it('should render "£" when array of items has one item with price "99.99"', () => {
      render(<InvoiceListItem invoice={filledInvoice} />);

      expect(screen.queryAllByText('£ 99.99')).toHaveLength(2);
    });

    it('should render "£" when array of items has two elements, one with price 99.99 and quantity 2, one with price 1.59', () => {
      render(
        <InvoiceListItem
          invoice={{
            ...filledInvoice,
            items: [
              { name: 'Product 1', price: 99.99, quantity: 2 },
              { name: 'Product 2', price: 1.59, quantity: 1 },
            ],
          }}
        />,
      );

      expect(screen.queryAllByText('£ 201.57')).toHaveLength(2);
    });
  });
});
