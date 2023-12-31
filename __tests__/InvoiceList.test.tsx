import InvoiceList from "@/components/InvoiceList";
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

describe("InvoiceList component", () => {
  describe("Render", () => {
    it("should render list of invoices when data array is not empty", () => {
      render(<InvoiceList invoices={[invoice]} statuses={["PENDING"]} />);

      expect(screen.getByRole("listitem")).toBeInTheDocument();
    });

    it("should render 'Create an invoice by clicking the' text when invoices array is empty and statuses array is empty", () => {
      render(<InvoiceList invoices={[]} statuses={[]} />);

      expect(
        screen.getByText("Create an invoice by clicking the"),
      ).toBeInTheDocument();
    });

    it("should render 'Create an invoice with status Draft to display it by clicking the' text when invoices array is empty and statuses array is '['DRAFT']'", () => {
      render(<InvoiceList invoices={[]} statuses={["DRAFT"]} />);

      expect(
        screen.getByText(
          "Create an invoice with status Draft to display it by clicking the",
        ),
      ).toBeInTheDocument();
    });

    it("should render 'Create an invoice with status Pending to display it by clicking the' text when invoices array is empty and statuses array is '['PENDING']'", () => {
      render(<InvoiceList invoices={[]} statuses={["PENDING"]} />);

      expect(
        screen.getByText(
          "Create an invoice with status Pending to display it by clicking the",
        ),
      ).toBeInTheDocument();
    });

    it("should render 'Create an invoice with status Paid to display it by clicking the' text when invoices array is empty and statuses array is '['PAID']'", () => {
      render(<InvoiceList invoices={[]} statuses={["PAID"]} />);

      expect(
        screen.getByText(
          "Create an invoice with status Paid to display it by clicking the",
        ),
      ).toBeInTheDocument();
    });

    it("should render 'Create an invoice with status Draft, Pending or Paid to display it by clicking the' text when invoices array is empty and statuses array is '['DRAFT', 'PENDING', 'PAID']'", () => {
      render(
        <InvoiceList invoices={[]} statuses={["DRAFT", "PENDING", "PAID"]} />,
      );

      expect(
        screen.getByText(
          "Create an invoice with status Draft, Pending or Paid to display it by clicking the",
        ),
      ).toBeInTheDocument();
    });
  });
});
