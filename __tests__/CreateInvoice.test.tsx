import CreateInvoice from '@/components/InvoiceForm/CreateInvoice';
import { Invoice } from '@/components/InvoiceForm/formSchema';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

const clientName = 'Paul Walker';

const filledInvoice: Invoice = {
  date: new Date(),
  clientName,
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

describe('CreateInvoice component', () => {
  describe('Unit', () => {
    it('should render "New" button', () => {
      render(
        <TestQueryProvider>
          <CreateInvoice defaultValues={filledInvoice} />
          <Toaster />
        </TestQueryProvider>,
      );

      expect(
        screen.getByRole('button', {
          name: /New/i,
        }),
      ).toBeInTheDocument();
    });

    it('should open create invoice form modal after click "New" button', async () => {
      render(
        <TestQueryProvider>
          <CreateInvoice defaultValues={filledInvoice} />
          <Toaster />
        </TestQueryProvider>,
      );

      const newButton = screen.getByRole('button', {
        name: /New/i,
      });
      await userEvent.click(newButton);

      expect(screen.getByText('New Invoice')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    beforeEach(async () => {
      toast.remove();

      render(
        <TestQueryProvider>
          <CreateInvoice defaultValues={filledInvoice} />
          <Toaster />
        </TestQueryProvider>,
      );

      // open create invoice form modal
      const newButton = screen.getByRole('button', {
        name: /New/i,
      });
      await userEvent.click(newButton);
    });

    it(`should render "Invoice for ${clientName} has been created 🔥" text when request is success after click "Save as Draft" submit button`, async () => {
      const saveAsDraftButton = screen.getByRole('button', {
        name: /Save as Draft/i,
      });
      await userEvent.click(saveAsDraftButton);

      expect(
        screen.getByText(`Invoice for ${clientName} has been created 🔥`),
      ).toBeInTheDocument();
    });

    it(`should render "Invoice for ${clientName} has been created 🔥" text when request is success after click "Save & Send" submit button`, async () => {
      const saveAndSendButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(saveAndSendButton);

      expect(
        screen.getByText(`Invoice for ${clientName} has been created 🔥`),
      ).toBeInTheDocument();
    });

    it('should render "Creating invoice ..." text when request is loading after click "Save as Draft" submit button', async () => {
      server.use(
        rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      const saveAsDraftButton = screen.getByRole('button', {
        name: /Save as Draft/i,
      });
      await userEvent.click(saveAsDraftButton);

      expect(screen.getByText('Creating invoice ...')).toBeInTheDocument();
    });

    it('should render "Creating invoice ..." text when request is loading after click "Save & Send" submit button', async () => {
      server.use(
        rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
          return res(ctx.delay(300));
        }),
      );

      const saveAndSendButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(saveAndSendButton);

      expect(screen.getByText('Creating invoice ...')).toBeInTheDocument();
    });

    it(`should render "Something went wrong. Invoice hasn't been created" text when request is failed after click "Save as Draft" submit button`, async () => {
      server.use(
        rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      const saveAsDraftButton = screen.getByRole('button', {
        name: /Save as Draft/i,
      });
      await userEvent.click(saveAsDraftButton);

      expect(
        screen.getByText("Something went wrong. Invoice hasn't been created"),
      ).toBeInTheDocument();
    });

    it(`should render "Something went wrong. Invoice hasn't been created" text when request is failed after click "Save & Send" submit button`, async () => {
      server.use(
        rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      const saveAndSendButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(saveAndSendButton);

      expect(
        screen.getByText("Something went wrong. Invoice hasn't been created"),
      ).toBeInTheDocument();
    });
  });
});
