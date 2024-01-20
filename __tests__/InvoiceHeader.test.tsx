import InvoiceHeader from '@/components/InvoiceHeader';
import { getFetchedInvoice } from '@/helpers';
import { render, screen } from '@testing-library/react';

describe('InvoiceHeader component', () => {
  describe('Unit', () => {
    it("should display 'No invoices' text when invoices array is empty", () => {
      render(<InvoiceHeader invoices={[]} />);

      expect(screen.getByText('No invoices')).toBeInTheDocument();
    });

    it("should display '1 invoice' text when invoices array length is 1", () => {
      render(<InvoiceHeader invoices={[getFetchedInvoice()]} />);

      expect(screen.getByText('1 invoice')).toBeInTheDocument();
    });

    it("should display 'There are 2 invoices' text when invoices array length is 2", () => {
      render(
        <InvoiceHeader invoices={[getFetchedInvoice(), getFetchedInvoice()]} />,
      );

      expect(screen.getByText('There are 2 invoices')).toBeInTheDocument();
    });
  });
});
