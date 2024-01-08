import CreateInvoice from "@/components/InvoiceForm/CreateInvoice";
import { Invoice } from "@/components/InvoiceForm/formSchema";
import Toaster from "@/components/ui/Toaster";
import { API_URL } from "@/lib/axios";
import { server } from "@/mocks/server";
import { TestQueryProvider } from "@/providers/TestQueryProvider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import toast from "react-hot-toast";

const clientName = "ABC Company";
const processingMessage = "Creating invoice ...";
const successMessage = `Invoice for ${clientName} has been created 🔥`;
const errorMessage = "Something went wrong. Invoice hasn't been created";

const filledDefaultValues: Invoice = {
  clientName,
  clientEmail: "abc@example.com",
  date: new Date(),
  status: "PENDING",
  paymentTerm: "NET_7",
  projectDescription: "Web development project",
  billFromAddress: {
    streetName: "123 Main St",
    city: "Cityville",
    postCode: "12345",
    country: "Countryland",
  },
  billToAddress: {
    streetName: "456 Park Ave",
    city: "Townsville",
    postCode: "67890",
    country: "Countryland",
  },
  items: [
    {
      name: "Website Design",
      price: 500,
      quantity: 1,
    },
    {
      name: "Backend Development",
      price: 1000,
      quantity: 1,
    },
  ],
};

describe("CreateInvoiceForm component", () => {
  describe("Render", () => {
    beforeEach(async () => {
      render(
        <TestQueryProvider>
          <CreateInvoice defaultValues={filledDefaultValues} />
        </TestQueryProvider>,
      );

      // Open form
      const newButton = screen.getByRole("button", {
        name: /New/i,
      });
      await userEvent.click(newButton);
    });

    it("should render input for 'Bill from - Street address' in form", () => {
      const billFromStreetAddressInput = screen.getByTestId(
        "billFromStreetAddress",
      );

      expect(billFromStreetAddressInput).toBeInTheDocument();
    });

    it("should render input for 'Bill from - City' in form", () => {
      const billFromCityInput = screen.getByTestId("billFromCity");

      expect(billFromCityInput).toBeInTheDocument();
    });

    it("should render input for 'Bill from - Post Code' in form", () => {
      const billFromPostCodeInput = screen.getByTestId("billFromPostCode");

      expect(billFromPostCodeInput).toBeInTheDocument();
    });

    it("should render input for 'Bill from - Country' in form", () => {
      const billFromCountryInput = screen.getByTestId("billFromCountry");

      expect(billFromCountryInput).toBeInTheDocument();
    });

    it("should render input for 'Client’s Name' in form", () => {
      const clientNameInput = screen.getByLabelText("Client’s Name");

      expect(clientNameInput).toBeInTheDocument();
    });

    it("should render input for 'Client’s Email' in form", () => {
      const clientEmailInput = screen.getByLabelText("Client’s Email");

      expect(clientEmailInput).toBeInTheDocument();
    });

    it("should render input for 'Bill to - Street address' in form", () => {
      const billToStreetAddress = screen.getByTestId("billToStreetAddress");

      expect(billToStreetAddress).toBeInTheDocument();
    });

    it("should render input for 'Bill to - City' in form", () => {
      const billToCity = screen.getByTestId("billToCity");

      expect(billToCity).toBeInTheDocument();
    });

    it("should render input for 'Bill to - Post Code' in form", () => {
      const billToPostCode = screen.getByTestId("billToPostCode");

      expect(billToPostCode).toBeInTheDocument();
    });

    it("should render input for 'Bill to - Country' in form", () => {
      const billToCountry = screen.getByTestId("billToCountry");

      expect(billToCountry).toBeInTheDocument();
    });

    it("should render select for 'Invoice date' in form", () => {
      const dateSelect = screen.getByRole("button", {
        name: /Invoice date/i,
      });

      expect(dateSelect).toBeInTheDocument();
    });

    it("should render select for 'Payment Terms' in form", () => {
      const paymentTermSelect = screen.getByRole("combobox", {
        name: /Payment Terms/i,
      });

      expect(paymentTermSelect).toBeInTheDocument();
    });

    it("should render input for 'Project Description' in form", () => {
      const projectDescriptionInput = screen.getByLabelText(
        "Project Description",
      );

      expect(projectDescriptionInput).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    describe("with Toast", () => {
      beforeEach(async () => {
        toast.remove();

        render(
          <TestQueryProvider>
            <CreateInvoice defaultValues={filledDefaultValues} />
            <Toaster />
          </TestQueryProvider>,
        );

        // Open form
        const newButton = screen.getByRole("button", {
          name: /New/i,
        });
        await userEvent.click(newButton);
      });

      describe("'Save & Send' submit button", () => {
        it(`should display '${successMessage}' message in toast when request is success after click 'Save & Send' submit button`, async () => {
          const submitButton = screen.getByRole("button", {
            name: /Save & Send/i,
          });
          await userEvent.click(submitButton);

          const toast = screen.getByText(successMessage);

          expect(toast).toBeInTheDocument();
        });

        it(`should display '${processingMessage}' message in toast when request is pending after click 'Save & Send' submit button`, async () => {
          server.use(
            rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
              return res(ctx.delay(200), ctx.status(200));
            }),
          );

          const submitButton = screen.getByRole("button", {
            name: /Save & Send/i,
          });
          await userEvent.click(submitButton);

          const toast = screen.getByText(processingMessage);

          expect(toast).toBeInTheDocument();
        });

        it("should disable 'Save & Send' submit button after click when request is pending", async () => {
          server.use(
            rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
              return res(ctx.delay(500), ctx.status(200));
            }),
          );

          const submitButton = screen.getByRole("button", {
            name: /Save & Send/i,
          });
          await userEvent.click(submitButton);

          expect(submitButton).toBeDisabled();
        });

        it(`should display '${errorMessage}' error message in toast when error is not instance of axios after click 'Save & Send' submit button`, async () => {
          server.use(
            rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
              return res(ctx.status(403));
            }),
          );

          const submitButton = screen.getByRole("button", {
            name: /Save & Send/i,
          });
          await userEvent.click(submitButton);

          const toast = screen.getByText(errorMessage);

          expect(toast).toBeInTheDocument();
        });
      });

      describe("'Save as Draft' submit button", () => {
        it(`should display '${successMessage}' message in toast when request is success after click 'Save as Draft' submit button`, async () => {
          const submitButton = screen.getByRole("button", {
            name: /Save as Draft/i,
          });
          await userEvent.click(submitButton);

          const toast = screen.getByText(successMessage);

          expect(toast).toBeInTheDocument();
        });

        it(`should display '${processingMessage}' message in toast when request is pending after click 'Save as Draft' submit button`, async () => {
          server.use(
            rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
              return res(ctx.delay(200), ctx.status(200));
            }),
          );

          const submitButton = screen.getByRole("button", {
            name: /Save as Draft/i,
          });
          await userEvent.click(submitButton);

          const toast = screen.getByText(processingMessage);

          expect(toast).toBeInTheDocument();
        });

        it("should disable 'Save as Draft' submit button after click when request is pending", async () => {
          server.use(
            rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
              return res(ctx.delay(500), ctx.status(200));
            }),
          );

          const submitButton = screen.getByRole("button", {
            name: /Save as Draft/i,
          });
          await userEvent.click(submitButton);

          expect(submitButton).toBeDisabled();
        });

        it(`should display '${errorMessage}' error message in toast when error is not instance of axios after click 'Save as Draft' submit button`, async () => {
          server.use(
            rest.post(`${API_URL}/invoice`, (req, res, ctx) => {
              return res(ctx.status(403));
            }),
          );

          const submitButton = screen.getByRole("button", {
            name: /Save as Draft/i,
          });
          await userEvent.click(submitButton);

          const toast = screen.getByText(errorMessage);

          expect(toast).toBeInTheDocument();
        });
      });
    });

    it("should close create form after click 'Discard' button", async () => {
      render(
        <TestQueryProvider>
          <CreateInvoice defaultValues={filledDefaultValues} />
          <Toaster />
        </TestQueryProvider>,
      );

      // Open form
      const newButton = screen.getByRole("button", {
        name: /New/i,
      });
      await userEvent.click(newButton);

      const discardButton = screen.getByRole("button", {
        name: /Discard/i,
      });

      await userEvent.click(discardButton);

      expect(discardButton).not.toBeInTheDocument();
    });
  });
});
