import InvoiceHeader from "@/components/InvoiceHeader";
import { FetchInvoice } from "@/types";
import { render, screen } from "@testing-library/react";

const invoice: FetchInvoice = {
  id: 1,
  mark: "HDJ293",
  date: new Date(),
  clientName: "Paul Walker",
  clientEmail: "paul.walker@gmai.com",
  status: "PENDING",
  paymentTerm: "NET_14",
  projectDescription: "New website",
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
      name: "Logo",
      price: 99.99,
      quantity: 1,
    },
  ],
};

describe("InvoiceHeader component", () => {
  describe("Render", () => {
    it("should display 'No invoices' when invoices array is empty", () => {
      render(<InvoiceHeader invoices={[]} />);

      expect(screen.getByText("No invoices")).toBeInTheDocument();
    });

    it("should display '1 invoice' when invoices array length is 1", () => {
      render(<InvoiceHeader invoices={[invoice]} />);

      expect(screen.getByText("1 invoice")).toBeInTheDocument();
    });

    it("should display 'There are 2 invoices' when invoices array length is 2", () => {
      render(<InvoiceHeader invoices={[invoice, invoice]} />);

      expect(screen.getByText("There are 2 invoices")).toBeInTheDocument();
    });
  });
});
