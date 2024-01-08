import InvoiceDetailsActions from "@/components/InvoiceDetailsActions";
import Toaster from "@/components/ui/Toaster";
import { API_URL } from "@/lib/axios";
import { server } from "@/mocks/server";
import { TestQueryProvider } from "@/providers/TestQueryProvider";
import { FetchInvoice } from "@/types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import toast from "react-hot-toast";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      back: jest.fn(),
    };
  },
}));

const INVOICE_MARK = "AZS772";

const testFetchInvoice: FetchInvoice = {
  id: 1,
  mark: INVOICE_MARK,
  date: new Date(),
  clientName: "Paul Walker",
  clientEmail: "paul.walker@gmail.com",
  paymentTerm: "NET_14",
  status: "DRAFT",
  projectDescription: "Something",
  billFromAddress: {
    city: "New York",
    country: "USA",
    postCode: "10001",
    streetName: "123 Main Street",
  },
  billToAddress: {
    city: "Los Angeles",
    country: "USA",
    postCode: "90001",
    streetName: "456 Oak Avenue",
  },
  items: [
    {
      name: "Bread",
      price: 12.99,
      quantity: 1,
    },
  ],
};

describe("InvoiceDetailsActions", () => {
  describe("Render", () => {
    beforeEach(() => {
      render(
        <TestQueryProvider>
          <InvoiceDetailsActions data={testFetchInvoice} />
        </TestQueryProvider>,
      );
    });

    it("should render 'Edit' button", () => {
      const button = screen.getByRole("button", {
        name: /Edit/i,
      });

      expect(button).toBeInTheDocument();
    });

    it("should render 'Delete' button", () => {
      const button = screen.getByRole("button", {
        name: /Delete/i,
      });

      expect(button).toBeInTheDocument();
    });
  });
  describe("Behavior", () => {
    it("should open update invoice modal form after click 'Edit' button", async () => {
      render(
        <TestQueryProvider>
          <InvoiceDetailsActions data={testFetchInvoice} />
        </TestQueryProvider>,
      );

      const editButton = screen.getByRole("button", {
        name: /Edit/i,
      });
      await userEvent.click(editButton);

      const updateInvoiceModalButton = screen.getByRole("button", {
        name: /Save Changes/i,
      });

      expect(updateInvoiceModalButton).toBeInTheDocument();
    });

    describe("Opened AlertDialog", () => {
      beforeEach(async () => {
        toast.remove();

        render(
          <TestQueryProvider>
            <InvoiceDetailsActions data={testFetchInvoice} />
            <Toaster />
          </TestQueryProvider>,
        );

        const deleteButton = screen.getByRole("button", {
          name: /Delete/i,
        });

        await userEvent.click(deleteButton);
      });

      it("should close AlertDialog after click 'Cancel' button", async () => {
        const cancelButton = screen.getByRole("button", {
          name: /Cancel/i,
        });

        await userEvent.click(cancelButton);

        // After close AlertDialog we can't get cancelButton
        expect(cancelButton).not.toBeInTheDocument();
      });

      it("should close AlertDialog after click 'Delete' button", async () => {
        const deleteButton = screen.getByRole("button", {
          name: /Delete/i,
        });

        await userEvent.click(deleteButton);

        expect(deleteButton).not.toBeInTheDocument();
      });

      it(`should contain ${INVOICE_MARK} invoice mark inside description`, () => {
        const description = screen.getByText((content, element) =>
          content.includes(INVOICE_MARK),
        );

        expect(description).toBeInTheDocument();
      });

      it(`should display 'Invoice #${INVOICE_MARK} has been deleted 🔥' message in toast after success`, async () => {
        const deleteButton = screen.getByRole("button", {
          name: /Delete/i,
        });

        await userEvent.click(deleteButton);

        const toast = await screen.findByRole("status");
        expect(toast).toHaveTextContent(
          `Invoice #${INVOICE_MARK} has been deleted 🔥`,
        );
      });

      it(`should display 'Deleting #${INVOICE_MARK} invoice ...' message in toast when request is loading`, async () => {
        server.use(
          rest.delete(`${API_URL}/invoice/:id`, (req, res, ctx) => {
            return res(ctx.delay(300), ctx.status(200));
          }),
        );

        const deleteButton = screen.getByRole("button", {
          name: /Delete/i,
        });

        await userEvent.click(deleteButton);

        const toast = await screen.findByRole("status");
        expect(toast).toHaveTextContent(
          `Deleting #${INVOICE_MARK} invoice ...`,
        );
      });

      it("should display 'Something went wrong. Invoice hasn't been deleted' error message in toast when error is not instance of axios", async () => {
        server.use(
          rest.delete(`${API_URL}/invoice/:id`, (req, res, ctx) => {
            return res(ctx.status(403));
          }),
        );
        const deleteButton = screen.getByRole("button", {
          name: /Delete/i,
        });

        await userEvent.click(deleteButton);

        const toast = await screen.findByRole("status");
        expect(toast).toHaveTextContent(
          "Something went wrong. Invoice hasn't been deleted",
        );
      });
    });
  });
});
