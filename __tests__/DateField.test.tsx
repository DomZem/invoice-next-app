import DateField from '@/components/InvoiceForm/Fields/DateField';
import { InvoiceFormProvider } from '@/helpers/InvoiceFormProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';

describe('DateField component', () => {
  describe('Unit', () => {
    it("should render 'invoice date' input", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <DateField variant="create" />
        </InvoiceFormProvider>,
      );

      expect(screen.getByLabelText('invoice date')).toBeInTheDocument();
    });

    it("should disable 'invoice date' input when variant prop is 'update'", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <DateField variant="update" />
        </InvoiceFormProvider>,
      );

      expect(screen.getByLabelText('invoice date')).toBeDisabled();
    });

    it("should open popover after click 'invoice date' input when variant prop is 'create'", async () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <DateField variant="create" />
        </InvoiceFormProvider>,
      );

      const currentMonth = format(new Date(), 'LLL yyy');

      const invoiceDateInput = screen.getByLabelText('invoice date');
      await userEvent.click(invoiceDateInput);

      expect(screen.getByText(currentMonth)).toBeInTheDocument();
    });

    it("should close opened popover after click 'invoice date' input when variant prop is 'create'", async () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <DateField variant="create" />
        </InvoiceFormProvider>,
      );

      const currentMonth = format(new Date(), 'LLL yyy');

      const invoiceDateInput = screen.getByLabelText('invoice date');
      await userEvent.click(invoiceDateInput);

      const currentMonthText = screen.getByText(currentMonth);
      await userEvent.click(invoiceDateInput);

      expect(currentMonthText).not.toBeInTheDocument();
    });
  });
});
