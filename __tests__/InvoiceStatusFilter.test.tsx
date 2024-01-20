import InvoiceStatusFilter from '@/components/InvoiceStatusFilter';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('InvoiceStatusFilter component', () => {
  describe('Unit', () => {
    it("should open dialog after click 'Filter by' button", async () => {
      render(
        <InvoiceStatusFilter
          selectedStatuses={['DRAFT']}
          onCheckboxClick={jest.fn()}
        />,
      );

      const filterByButton = screen.getByRole('button');
      await userEvent.click(filterByButton);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it("should close opened dialog after click 'Filter by' button", async () => {
      render(
        <InvoiceStatusFilter
          selectedStatuses={['DRAFT']}
          onCheckboxClick={jest.fn()}
        />,
      );

      const filterByButton = screen.getByRole('button');
      await userEvent.click(filterByButton);

      const dialog = screen.getByRole('dialog');
      await userEvent.click(filterByButton);

      expect(dialog).not.toBeInTheDocument();
    });

    it("should display 'Draft' checkbox in dialog", async () => {
      render(
        <InvoiceStatusFilter
          selectedStatuses={['DRAFT']}
          onCheckboxClick={jest.fn()}
        />,
      );

      const filterByButton = screen.getByRole('button');
      await userEvent.click(filterByButton);

      expect(
        screen.getByRole('checkbox', {
          name: /Draft/i,
        }),
      ).toBeInTheDocument();
    });

    it("should display 'Pending' checkbox in dialog", async () => {
      render(
        <InvoiceStatusFilter
          selectedStatuses={['DRAFT']}
          onCheckboxClick={jest.fn()}
        />,
      );

      const filterByButton = screen.getByRole('button');
      await userEvent.click(filterByButton);

      expect(
        screen.getByRole('checkbox', {
          name: /Pending/i,
        }),
      ).toBeInTheDocument();
    });

    it("should display 'Paid' checkbox in dialog", async () => {
      render(
        <InvoiceStatusFilter
          selectedStatuses={['DRAFT']}
          onCheckboxClick={jest.fn()}
        />,
      );

      const filterByButton = screen.getByRole('button');
      await userEvent.click(filterByButton);

      expect(
        screen.getByRole('checkbox', {
          name: /Paid/i,
        }),
      ).toBeInTheDocument();
    });

    it("should display 'Draft' checkbox as checked when selectedStatuses array contains 'DRAFT' status", async () => {
      render(
        <InvoiceStatusFilter
          selectedStatuses={['DRAFT', 'PAID']}
          onCheckboxClick={jest.fn()}
        />,
      );

      const filterByButton = screen.getByRole('button');
      await userEvent.click(filterByButton);

      expect(
        screen.getByRole('checkbox', {
          name: /Draft/,
          checked: true,
        }),
      );
    });

    it("should display 'Pending' checkbox as checked when selectedStatuses array contains 'PENDING' status", async () => {
      render(
        <InvoiceStatusFilter
          selectedStatuses={['DRAFT', 'PENDING']}
          onCheckboxClick={jest.fn()}
        />,
      );

      const filterByButton = screen.getByRole('button');
      await userEvent.click(filterByButton);

      expect(
        screen.getByRole('checkbox', {
          name: /Pending/,
          checked: true,
        }),
      );
    });

    it("should display 'Paid' checkbox as checked when selectedStatuses array contains 'PAID' status", async () => {
      render(
        <InvoiceStatusFilter
          selectedStatuses={['PENDING', 'PAID']}
          onCheckboxClick={jest.fn()}
        />,
      );

      const filterByButton = screen.getByRole('button');
      await userEvent.click(filterByButton);

      expect(
        screen.getByRole('checkbox', {
          name: /Paid/,
          checked: true,
        }),
      );
    });
  });
});
