import UpdateInvoice from '@/components/InvoiceForm/UpdateInvoice';
import { Sheet } from '@/components/UI/Sheet';
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

const mark = 'AZG8272';

const fetchedInvoice: FetchInvoice = {
  id: 1,
  mark,
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
};

describe('UpdateInvoice component', () => {
  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();

      render(
        <TestQueryProvider>
          <Sheet>
            <UpdateInvoice data={fetchedInvoice} />
            <Toaster />
          </Sheet>
        </TestQueryProvider>,
      );
    });

    it(`should render "Invoice #${mark} has been updated 🔥" text when request is success after click "Save Changes" submit button`, async () => {
      // submit form
      const saveChangesButton = screen.getByRole('button', {
        name: /Save Changes/i,
      });
      await userEvent.click(saveChangesButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        `Invoice #${mark} has been updated 🔥`,
      );
    });

    it(`should render "Upadting #${mark} invoice ..." text when request is loading after click "Save Changes" submit button`, async () => {
      server.use(
        rest.put(`${API_URL}/invoice/:id`, (req, res, ctx) => {
          return res(ctx.delay(200));
        }),
      );

      // submit form
      const saveChangesButton = screen.getByRole('button', {
        name: /Save Changes/i,
      });
      await userEvent.click(saveChangesButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        `Upadting #${mark} invoice ...`,
      );
    });

    it(`should render "Something went wrong. Invoice hasn't been updated" text when request is failed after click "Save Changes" submit button`, async () => {
      server.use(
        rest.put(`${API_URL}/invoice/:id`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      // submit form
      const saveChangesButton = screen.getByRole('button', {
        name: /Save Changes/i,
      });
      await userEvent.click(saveChangesButton);

      expect(screen.getByRole('status')).toHaveTextContent(
        "Something went wrong. Invoice hasn't been updated",
      );
    });
  });
});
