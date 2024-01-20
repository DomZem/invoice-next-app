import InvoiceList from '@/components/InvoiceList';
import { getFetchedInvoice } from '@/helpers';
import { render, screen } from '@testing-library/react';

describe('InvoiceList component', () => {
  describe('Unit', () => {
    it('should render list of invoices when data array is not empty', () => {
      render(
        <InvoiceList invoices={[getFetchedInvoice()]} statuses={['PENDING']} />,
      );

      expect(screen.getByRole('listitem')).toBeInTheDocument();
    });

    it("should render 'Create an invoice by clicking the' text when invoices array is empty and statuses array is empty", () => {
      render(<InvoiceList invoices={[]} statuses={[]} />);

      expect(
        screen.getByText('Create an invoice by clicking the'),
      ).toBeInTheDocument();
    });

    it("should render 'Create an invoice with status Draft to display it by clicking the' text when invoices array is empty and statuses array is '['DRAFT']'", () => {
      render(<InvoiceList invoices={[]} statuses={['DRAFT']} />);

      expect(
        screen.getByText(
          'Create an invoice with status Draft to display it by clicking the',
        ),
      ).toBeInTheDocument();
    });

    it("should render 'Create an invoice with status Pending to display it by clicking the' text when invoices array is empty and statuses array is '['PENDING']'", () => {
      render(<InvoiceList invoices={[]} statuses={['PENDING']} />);

      expect(
        screen.getByText(
          'Create an invoice with status Pending to display it by clicking the',
        ),
      ).toBeInTheDocument();
    });

    it("should render 'Create an invoice with status Paid to display it by clicking the' text when invoices array is empty and statuses array is '['PAID']'", () => {
      render(<InvoiceList invoices={[]} statuses={['PAID']} />);

      expect(
        screen.getByText(
          'Create an invoice with status Paid to display it by clicking the',
        ),
      ).toBeInTheDocument();
    });

    it("should render 'Create an invoice with status Draft, Pending or Paid to display it by clicking the' text when invoices array is empty and statuses array is '['DRAFT', 'PENDING', 'PAID']'", () => {
      render(
        <InvoiceList invoices={[]} statuses={['DRAFT', 'PENDING', 'PAID']} />,
      );

      expect(
        screen.getByText(
          'Create an invoice with status Draft, Pending or Paid to display it by clicking the',
        ),
      ).toBeInTheDocument();
    });
  });
});
