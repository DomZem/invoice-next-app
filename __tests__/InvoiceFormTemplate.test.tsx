import InvoiceFormTemplate from '@/components/InvoiceForm/InvoiceFormTemplate';
import { Invoice, defaultValues } from '@/components/InvoiceForm/formSchema';
import { Sheet } from '@/components/UI/Sheet';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const filledInvoice: Invoice = {
  date: new Date(),
  clientName: 'Paul Walker',
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

describe('InvoiceFormTemplate component', () => {
  describe('Unit', () => {
    it('should render "New Invoice" text when "variant" prop is create', () => {
      render(
        <Sheet>
          <InvoiceFormTemplate
            variant="create"
            onSubmit={jest.fn()}
            mark="HN2929"
            isSuccess={false}
            isPending={false}
            defaultValues={defaultValues}
          />
        </Sheet>,
      );

      expect(screen.getByText('New Invoice')).toBeInTheDocument();
    });

    it('should render "Edit HN2929" text when "variant" prop is update and "mark" prop is HN2929', () => {
      render(
        <Sheet>
          <InvoiceFormTemplate
            variant="update"
            mark="HN2929"
            onSubmit={jest.fn()}
            isSuccess={false}
            isPending={false}
            defaultValues={defaultValues}
          />
        </Sheet>,
      );

      expect(screen.getByText('Edit HN2929')).toBeInTheDocument();
    });

    it('should render project description input', () => {
      render(
        <Sheet>
          <InvoiceFormTemplate
            variant="update"
            onSubmit={jest.fn()}
            isSuccess={false}
            isPending={false}
            defaultValues={defaultValues}
          />
        </Sheet>,
      );

      expect(screen.getByLabelText('project description')).toBeInTheDocument();
    });

    it('should not clear inputs value when "isSuccess" prop is false and "variant" prop is create after submit form by "Save as Draft" button or "Save & Send"', async () => {
      const projectDescription = 'Materials for rocket';

      render(
        <Sheet>
          <InvoiceFormTemplate
            variant="create"
            isSuccess={false}
            isPending={false}
            defaultValues={{
              ...filledInvoice,
              projectDescription,
            }}
            onSubmit={jest.fn()}
          />
        </Sheet>,
      );

      const projectDescriptionInput = screen.getByLabelText(
        'project description',
      );

      // before submit
      expect(projectDescriptionInput).toHaveValue(projectDescription);

      // submit
      const saveAsDraftSubmitButton = screen.getByRole('button', {
        name: /Save as Draft/i,
      });
      await userEvent.click(saveAsDraftSubmitButton);

      // after submit check if value in project description input is the same
      expect(projectDescriptionInput).toHaveValue(projectDescription);

      // submit
      const saveAndSendSubmitButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(saveAndSendSubmitButton);

      // after submit check if value in project description input is the same
      expect(projectDescriptionInput).toHaveValue(projectDescription);
    });

    it('should not clear inputs value when "isSuccess" prop is true and "variant" prop is update after submit form by "Save Changes" button', async () => {
      const projectDescription = 'Materials for rocket';

      render(
        <Sheet>
          <InvoiceFormTemplate
            variant="update"
            isSuccess
            isPending={false}
            defaultValues={{
              ...filledInvoice,
              projectDescription,
            }}
            onSubmit={jest.fn()}
          />
        </Sheet>,
      );

      const projectDescriptionInput = screen.getByLabelText(
        'project description',
      );

      // before submit
      expect(projectDescriptionInput).toHaveValue(projectDescription);

      // submit
      const saveChangesButton = screen.getByRole('button', {
        name: /Save Changes/i,
      });
      await userEvent.click(saveChangesButton);

      // after submit check if value in project description input is the same
      expect(projectDescriptionInput).toHaveValue(projectDescription);
    });

    it('should clear inputs value when "isSuccess" prop is true and "variant" prop is create after submit form by "Save as Draft" button', async () => {
      render(
        <Sheet>
          <InvoiceFormTemplate
            variant="create"
            isSuccess
            isPending={false}
            defaultValues={{
              ...filledInvoice,
              projectDescription: '',
            }}
            onSubmit={jest.fn()}
          />
        </Sheet>,
      );

      // Instead of type each input and then send form to check if the values have been reset,
      // We just type one input and then we check if that input is empty.
      // Typing each of input would take a lot of time to complete the test

      const projectDescriptionInput = screen.getByLabelText(
        'project description',
      );
      await userEvent.type(projectDescriptionInput, 'Materials for rocket');

      // submit form
      const saveAsDraftButton = screen.getByRole('button', {
        name: /Save as Draft/i,
      });
      await userEvent.click(saveAsDraftButton);

      // check if the project description input is empty (or the value is the same as default)
      expect(projectDescriptionInput).toHaveValue('');
    });

    it('should clear inputs value when "isSuccess" prop is true and "variant" prop is create after submit form by "Save & Send" button', async () => {
      render(
        <Sheet>
          <InvoiceFormTemplate
            variant="create"
            isSuccess
            isPending={false}
            defaultValues={{
              ...filledInvoice,
              projectDescription: '',
            }}
            onSubmit={jest.fn()}
          />
        </Sheet>,
      );

      // The same scenario of typing like in previous test

      const projectDescriptionInput = screen.getByLabelText(
        'project description',
      );
      await userEvent.type(projectDescriptionInput, 'Materials for rocket');

      // submit form
      const saveAndSendButton = screen.getByRole('button', {
        name: /Save & Send/i,
      });
      await userEvent.click(saveAndSendButton);

      // check if the project description input is empty (or the value is the same as default)
      expect(projectDescriptionInput).toHaveValue('');
    });
  });
});
