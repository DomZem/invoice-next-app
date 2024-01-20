import InvoiceStatus from '@/components/InvoiceStatus';
import { render, screen } from '@testing-library/react';

describe('InvoiceStatus component', () => {
  describe('Unit', () => {
    it("should display 'Draft' when invoice status is 'DRAFT'", () => {
      render(<InvoiceStatus status="DRAFT" />);

      expect(screen.getByText('Draft')).toBeInTheDocument();
    });

    it("should display 'Pending' when invoice status is 'PENDING'", () => {
      render(<InvoiceStatus status="PENDING" />);

      expect(screen.getByText('Pending')).toBeInTheDocument();
    });

    it("should display 'Paid' when invoice status is 'Paid'", () => {
      render(<InvoiceStatus status="PAID" />);

      expect(screen.getByText('Paid')).toBeInTheDocument();
    });
  });
});
