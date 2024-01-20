import SubmitButtons from '@/components/InvoiceForm/Fields/SubmitButtons';
import { InvoiceFormProvider } from '@/helpers/InvoiceFormProvider';
import { render, screen } from '@testing-library/react';

describe('SubmitButtons component', () => {
  describe('Unit', () => {
    it("should render 'Discard' text in submit button when variant prop is 'create'", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <SubmitButtons
            variant="create"
            isPending={false}
            onSaveSubmit={jest.fn()}
          />
        </InvoiceFormProvider>,
      );

      expect(
        screen.getByRole('button', { name: /Discard/i }),
      ).toBeInTheDocument();
    });

    it("should render 'Cancel' text in submit button when variant prop is 'update'", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <SubmitButtons
            variant="update"
            isPending={false}
            onSaveSubmit={jest.fn()}
          />
        </InvoiceFormProvider>,
      );

      expect(
        screen.getByRole('button', { name: /Cancel/i }),
      ).toBeInTheDocument();
    });

    it("should render 'Save as Draft' submit button when variant prop is 'create'", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <SubmitButtons
            variant="create"
            isPending={false}
            onSaveSubmit={jest.fn()}
          />
        </InvoiceFormProvider>,
      );

      expect(
        screen.getByRole('button', { name: /Save as Draft/i }),
      ).toBeInTheDocument();
    });

    it("should not render 'Save as Draft' submit button when variant prop is 'update'", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <SubmitButtons
            variant="update"
            isPending={false}
            onSaveSubmit={jest.fn()}
          />
        </InvoiceFormProvider>,
      );

      expect(
        screen.queryByRole('button', { name: /Save as Draft/i }),
      ).not.toBeInTheDocument();
    });

    it("should render 'Save & Send' text in submit button when variant prop is 'create'", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <SubmitButtons
            variant="create"
            isPending={false}
            onSaveSubmit={jest.fn()}
          />
        </InvoiceFormProvider>,
      );

      expect(
        screen.getByRole('button', { name: /Save & Send/i }),
      ).toBeInTheDocument();
    });

    it("should render 'Save Changes' text in submit button when variant prop is 'update'", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <SubmitButtons
            variant="update"
            isPending={false}
            onSaveSubmit={jest.fn()}
          />
        </InvoiceFormProvider>,
      );

      expect(
        screen.getByRole('button', { name: /Save Changes/i }),
      ).toBeInTheDocument();
    });

    it("should disable 'Save as Draft' submit button when isPending prop is 'true'", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <SubmitButtons
            variant="create"
            isPending={true}
            onSaveSubmit={jest.fn()}
          />
        </InvoiceFormProvider>,
      );

      expect(
        screen.getByRole('button', { name: /Save as Draft/i }),
      ).toBeDisabled();
    });

    it("should disable 'Save & Send' or 'Save Changes' submit button when isPending prop is 'true'", () => {
      render(
        <InvoiceFormProvider onSubmit={jest.fn()} items={[]}>
          <SubmitButtons
            variant="create"
            isPending={true}
            onSaveSubmit={jest.fn()}
          />
        </InvoiceFormProvider>,
      );

      expect(
        screen.getByRole('button', { name: /Save & Send/i }),
      ).toBeDisabled();
    });
  });
});
