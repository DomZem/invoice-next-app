import BillFromFields from '@/components/InvoiceForm/Fields/BillFromFields';
import SubmitButtons from '@/components/InvoiceForm/Fields/SubmitButtons';
import { createStringWithLength } from '@/helpers';
import { InvoiceFormProvider } from '@/helpers/InvoiceFormProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('BillFromFields component', () => {
  describe('Unit', () => {
    beforeEach(() => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <BillFromFields />
        </InvoiceFormProvider>,
      );
    });

    it("should render 'street address' input", () => {
      expect(screen.getByLabelText('street address')).toBeInTheDocument();
    });

    it("should render 'city' input", () => {
      expect(screen.getByLabelText('city')).toBeInTheDocument();
    });

    it("should render 'post code' input", () => {
      expect(screen.getByLabelText('post code')).toBeInTheDocument();
    });

    it("should render 'country' input", () => {
      expect(screen.getByLabelText('country')).toBeInTheDocument();
    });
  });

  describe('Integration - Validation', () => {
    beforeEach(async () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <BillFromFields />
          <SubmitButtons
            variant="create"
            isPending={false}
            onSaveSubmit={jest.fn()}
          />
        </InvoiceFormProvider>,
      );
    });

    it("should display 'Can't be empty' validation error message when value in 'street address' input is empty", async () => {
      const submitButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByTestId('streetAddressErrorMessage')).toHaveTextContent(
        "Can't be empty",
      );
    });

    it("should display 'Can't be empty' validation error message when value in 'city' input is empty", async () => {
      const submitButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByTestId('cityErrorMessage')).toHaveTextContent(
        "Can't be empty",
      );
    });

    it("should display 'Can't be empty' validation error message when value in 'post code' input empty", async () => {
      const submitButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByTestId('postCodeErrorMessage')).toHaveTextContent(
        "Can't be empty",
      );
    });

    it("should display 'Can't be empty' validation error message when value in 'country' input is empty", async () => {
      const submitButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(submitButton);

      expect(screen.getByTestId('countryErrorMessage')).toHaveTextContent(
        "Can't be empty",
      );
    });

    // Type value into input

    it("should display 'Can't be longer than 100 characters' validation error message when value length in input 'street address' is longer than 100", async () => {
      const streetAddressInput = screen.getByLabelText('street address');
      await userEvent.type(streetAddressInput, createStringWithLength(101));

      const submitButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(submitButton);

      expect(
        screen.getByText("Can't be longer than 100 characters"),
      ).toBeInTheDocument();
    });

    it("should display 'Can't be longer than 50 characters' validation error message when value length in input 'city' is longer than 50", async () => {
      const cityInput = screen.getByLabelText('city');
      await userEvent.type(cityInput, createStringWithLength(51));

      const submitButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(submitButton);

      expect(
        screen.getByText("Can't be longer than 50 characters"),
      ).toBeInTheDocument();
    });

    it("should display 'Can't be longer than 10 characters' validation error message when value length in input 'post code' is longer than 10", async () => {
      const postCodeInput = screen.getByLabelText('post code');
      await userEvent.type(postCodeInput, createStringWithLength(11));

      const submitButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(submitButton);

      expect(
        screen.getByText("Can't be longer than 10 characters"),
      ).toBeInTheDocument();
    });

    it("should display 'Can't be longer than 50 characters' validation error message when value length in input 'country' is longer than 50", async () => {
      const countryInput = screen.getByLabelText('country');
      await userEvent.type(countryInput, createStringWithLength(51));

      const submitButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(submitButton);

      expect(
        screen.getByText("Can't be longer than 50 characters"),
      ).toBeInTheDocument();
    });
  });
});
