import InvoiceMarkButton from "@/components/InvoiceMarkButton";
import Toaster from "@/components/ui/Toaster";
import { API_URL } from "@/lib/axios";
import { server } from "@/mocks/server";
import { TestQueryProvider } from "@/providers/TestQueryProvider";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import toast from "react-hot-toast";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("InvoiceMarkButton component", () => {
  describe("Render", () => {
    it("should render button with text 'Mark as Pending' when status is 'DRAFT' ", () => {
      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="DRAFT" id={1} />
        </TestQueryProvider>,
      );

      expect(
        screen.getByRole("button", {
          name: /Mark as Pending/i,
        }),
      ).toBeInTheDocument();
    });

    it("should render button with text 'Mark as Paid' when status is 'PENDING' ", () => {
      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="PENDING" id={1} />
        </TestQueryProvider>,
      );

      expect(
        screen.getByRole("button", {
          name: /Mark as Paid/i,
        }),
      ).toBeInTheDocument();
    });

    it("should render button with text 'Mark as Draft' when status is 'PAID' ", () => {
      render(
        <TestQueryProvider>
          <InvoiceMarkButton status="PAID" id={1} />
        </TestQueryProvider>,
      );

      expect(
        screen.getByRole("button", {
          name: /Mark as Draft/i,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    beforeEach(() => {
      toast.remove();
    });

    it("should display 'Updating invoice status ...' message in toast when request is processing", async () => {
      server.use(
        rest.patch(`${API_URL}/invoice/:id`, (req, res, ctx) => {
          return res(ctx.delay(300), ctx.status(200));
        }),
      );

      render(
        <TestQueryProvider>
          <Toaster />
          <InvoiceMarkButton status="PAID" id={1} />
        </TestQueryProvider>,
      );

      const button = screen.getByRole("button", {
        name: /Mark as Draft/i,
      });
      await userEvent.click(button);

      expect(
        screen.getByText("Updating invoice status ..."),
      ).toBeInTheDocument();
    });

    it("should display 'Invoice status has been updated to pending 🔥' message in toast when status is 'DRAFT'", async () => {
      render(
        <TestQueryProvider>
          <Toaster />
          <InvoiceMarkButton status="DRAFT" id={1} />
        </TestQueryProvider>,
      );

      const button = screen.getByRole("button", {
        name: /Mark as Pending/i,
      });
      await userEvent.click(button);

      expect(
        screen.getByText("Invoice status has been updated to pending 🔥"),
      ).toBeInTheDocument();
    });

    it("should display 'Invoice status has been updated to paid 🔥' message in toast when status is 'PENDING'", async () => {
      render(
        <TestQueryProvider>
          <Toaster />
          <InvoiceMarkButton status="PENDING" id={1} />
        </TestQueryProvider>,
      );

      const button = screen.getByRole("button", {
        name: /Mark as Paid/i,
      });
      await userEvent.click(button);

      expect(
        screen.getByText("Invoice status has been updated to paid 🔥"),
      ).toBeInTheDocument();
    });

    it("should display 'Invoice status has been updated to draft 🔥' message in toast when status is 'PAID'", async () => {
      render(
        <TestQueryProvider>
          <Toaster />
          <InvoiceMarkButton status="PAID" id={1} />
        </TestQueryProvider>,
      );

      const button = screen.getByRole("button", {
        name: /Mark as Draft/i,
      });
      await userEvent.click(button);

      expect(
        screen.getByText("Invoice status has been updated to draft 🔥"),
      ).toBeInTheDocument();
    });

    it("should display 'Something went wrong. Invoice status hasn't been updated' error message in toast when error is not instance of axios", async () => {
      server.use(
        rest.patch(`${API_URL}/invoice/:id`, (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      render(
        <TestQueryProvider>
          <Toaster />
          <InvoiceMarkButton status="PAID" id={1} />
        </TestQueryProvider>,
      );

      const button = screen.getByRole("button", {
        name: /Mark as Draft/i,
      });
      await userEvent.click(button);

      expect(
        screen.getByText(
          "Something went wrong. Invoice status hasn't been updated",
        ),
      ).toBeInTheDocument();
    });
  });
});
