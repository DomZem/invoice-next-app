import InvoicePagination from '@/components/InvoicePagination';
import { render, screen } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('InvoicePagination component', () => {
  describe('Unit', () => {
    it('should render "Current page: 6" text when page prop is 6', () => {
      render(<InvoicePagination page={6} lastPage={12} invoicesLength={60} />);

      expect(screen.getByTestId('current-page')).toHaveTextContent('6');
    });

    it('should disable previous button when page prop is 1', () => {
      render(<InvoicePagination page={1} lastPage={12} invoicesLength={60} />);

      expect(
        screen.getByRole('button', {
          name: /Previous/i,
        }),
      ).toBeDisabled();
    });

    it('should disable previous button when invoicesLength prop is 0', () => {
      render(<InvoicePagination page={6} lastPage={12} invoicesLength={0} />);

      expect(
        screen.getByRole('button', {
          name: /Previous/i,
        }),
      ).toBeDisabled();
    });

    it('should disable next button when value in page prop and last page prop is the same', () => {
      render(<InvoicePagination page={12} lastPage={12} invoicesLength={60} />);

      expect(
        screen.getByRole('button', {
          name: /Next/i,
        }),
      ).toBeDisabled();
    });

    it('should disable next button when invoicesLength prop is 0', () => {
      render(<InvoicePagination page={1} lastPage={12} invoicesLength={0} />);

      expect(
        screen.getByRole('button', {
          name: /Next/i,
        }),
      ).toBeDisabled();
    });
  });
});
