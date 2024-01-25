import InvoiceDetailsActions from '@/components/InvoiceDetailsActions';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { FetchInvoice } from '@/types';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      back: jest.fn(),
    };
  },
}));

const mark = 'AZS772';

const invoice: FetchInvoice = {
  id: 1,
  mark,
  date: new Date(),
  clientName: 'Paul Walker',
  clientEmail: 'paul.walker@gmail.com',
  paymentTerm: 'NET_14',
  status: 'DRAFT',
  projectDescription: 'Something',
  billFromAddress: {
    city: 'New York',
    country: 'USA',
    postCode: '10001',
    streetName: '123 Main Street',
  },
  billToAddress: {
    city: 'Los Angeles',
    country: 'USA',
    postCode: '90001',
    streetName: '456 Oak Avenue',
  },
  items: [
    {
      name: 'Bread',
      price: 12.99,
      quantity: 1,
    },
  ],
};

describe('InvoiceDetailsActions component', () => {
  describe('Unit', () => {
    it('should open AlertDialog component after click "Delete" button', async () => {
      render(
        <TestQueryProvider>
          <InvoiceDetailsActions data={invoice} />
        </TestQueryProvider>,
      );

      const deleteButton = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(deleteButton);

      expect(
        screen.getByRole('button', {
          name: /Delete/i,
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole('button', {
          name: /Cancel/i,
        }),
      ).toBeInTheDocument();
    });

    it('should open UpdateInvoice component after click "Edit" button', async () => {
      render(
        <TestQueryProvider>
          <InvoiceDetailsActions data={invoice} />
        </TestQueryProvider>,
      );

      const editButton = screen.getByRole('button', {
        name: 'Edit',
      });
      await userEvent.click(editButton);

      expect(
        screen.getByRole('button', {
          name: /Save Changes/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it(`should render "Invoice #${mark} has been deleted 🔥" text when request is success`, async () => {
      render(
        <TestQueryProvider>
          <InvoiceDetailsActions data={invoice} />
          <Toaster />
        </TestQueryProvider>,
      );

      // open modal
      const deleteButton = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(deleteButton);

      // delete invoice
      const deleteModalButton = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(deleteModalButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        `Invoice #${mark} has been deleted 🔥`,
      );
    });

    it(`should render "Deleting #${mark} invoice ..." text when request is loading`, async () => {
      server.use(
        rest.delete(`${API_URL}/invoice/:id`, (req, res, ctx) => {
          return res(ctx.delay(200));
        }),
      );

      render(
        <TestQueryProvider>
          <InvoiceDetailsActions data={invoice} />
          <Toaster />
        </TestQueryProvider>,
      );

      // open modal
      const deleteButton = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(deleteButton);

      // delete invoice
      const deleteModalButton = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(deleteModalButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        `Deleting #${mark} invoice ...`,
      );
    });

    it(`should render "Something went wrong. Invoice hasn't been deleted" text when request is failed`, async () => {
      server.use(
        rest.delete(`${API_URL}/invoice/:id`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <InvoiceDetailsActions data={invoice} />
          <Toaster />
        </TestQueryProvider>,
      );

      // open modal
      const deleteButton = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(deleteButton);

      // delete invoice
      const deleteModalButton = screen.getByRole('button', {
        name: /Delete/i,
      });
      await userEvent.click(deleteModalButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        "Something went wrong. Invoice hasn't been deleted",
      );
    });
  });
});
