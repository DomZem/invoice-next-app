import InvoiceMarkButton from '@/components/InvoiceMarkButton';
import Toaster from '@/components/UI/Toaster';
import { TestQueryProvider } from '@/helpers/TestQueryProvider';
import { API_URL } from '@/lib/axios';
import { server } from '@/mocks/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import toast from 'react-hot-toast';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('InvoiceMarkButton component', () => {
  describe('Unit', () => {
    it('should render "Mark as Pending" text when status prop is "DRAFT"', () => {
      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="DRAFT" id={1} />
        </TestQueryProvider>,
      );

      expect(
        screen.getByRole('button', {
          name: /Mark as Pending/i,
        }),
      ).toBeInTheDocument();
    });

    it('should render "Mark as Paid" text when status prop is "PENDING"', () => {
      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="PENDING" id={1} />
        </TestQueryProvider>,
      );

      expect(
        screen.getByRole('button', {
          name: /Mark as Paid/i,
        }),
      ).toBeInTheDocument();
    });

    it('should render "Mark as Draft" text when status prop is "PAID"', () => {
      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="PAID" id={1} />
        </TestQueryProvider>,
      );

      expect(
        screen.getByRole('button', {
          name: /Mark as Draft/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    beforeEach(() => {
      toast.remove();
    });

    it('should render "Updating invoice status ..." text and disable button when request is loading', async () => {
      server.use(
        rest.patch(`${API_URL}/invoice/:id`, (req, res, ctx) => {
          return res(ctx.delay(300), ctx.status(200));
        }),
      );

      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="DRAFT" id={1} />
          <Toaster />
        </TestQueryProvider>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(button).toBeDisabled();
      expect(screen.getByRole('status')).toHaveTextContent(
        'Updating invoice status ...',
      );
    });

    it('should render "Invoice status has been updated to pending 🔥" text when request is success and prop status is "DRAFT"', async () => {
      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="DRAFT" id={1} />
          <Toaster />
        </TestQueryProvider>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Invoice status has been updated to pending 🔥',
      );
    });

    it('should render "Invoice status has been updated to paid 🔥" text when request is success and prop status is "PENDING"', async () => {
      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="PENDING" id={1} />
          <Toaster />
        </TestQueryProvider>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Invoice status has been updated to paid 🔥',
      );
    });

    it('should render "Invoice status has been updated to draft 🔥" text when request is success and prop status is "PAID"', async () => {
      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="PAID" id={1} />
          <Toaster />
        </TestQueryProvider>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(screen.getByRole('status')).toHaveTextContent(
        'Invoice status has been updated to draft 🔥',
      );
    });

    it("should render 'Something went wrong. Invoice status hasn't been updated' text when request is failed", async () => {
      server.use(
        rest.patch(`${API_URL}/invoice/:id`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="DRAFT" id={1} />
          <Toaster />
        </TestQueryProvider>,
      );

      const button = screen.getByRole('button');
      await userEvent.click(button);

      expect(screen.getByRole('status')).toHaveTextContent(
        "Something went wrong. Invoice status hasn't been updated",
      );
    });
  });
});
