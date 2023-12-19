import InvoiceMarkButton from "@/components/InvoiceMarkButton";
import Toaster from "@/components/ui/Toaster";
import { server } from "@/mocks/server";
import QueryProvider from "@/providers/QueryProvider";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

Object.defineProperty(global, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("LoginForm", () => {
  beforeEach(() => {});

  describe("Render", () => {
    it("it should render button with text 'Mark as Pending' when status is 'DRAFT' ", () => {
      render(
        <QueryProvider>
          <InvoiceMarkButton status="DRAFT" id={1} />
        </QueryProvider>,
      );

      const button = screen.getByRole("button");

      expect(button).toHaveTextContent("Mark as Pending");
    });

    it("it should render button with text 'Mark as Paid' when status is 'PENDING' ", () => {
      render(
        <QueryProvider>
          <InvoiceMarkButton status="PENDING" id={1} />
        </QueryProvider>,
      );

      const button = screen.getByRole("button");

      expect(button).toHaveTextContent("Mark as Paid");
    });

    it("it should render button with text 'Mark as Draft' when status is 'PAID' ", () => {
      render(
        <QueryProvider>
          <InvoiceMarkButton status="PAID" id={1} />
        </QueryProvider>,
      );

      const button = screen.getByRole("button");

      expect(button).toHaveTextContent("Mark as Draft");
    });
  });

  describe("Behavior", () => {
    it("should display 'Updating invoice status ...' message in toast when request is loading", async () => {
      // ARRANGE
      server.use(
        rest.patch("http://localhost:8080/invoice/1", (req, res, ctx) => {
          return res(ctx.delay(500), ctx.status(200));
        }),
      );
      render(
        <QueryProvider>
          <InvoiceMarkButton status="DRAFT" id={1} />
          <Toaster />
        </QueryProvider>,
      );

      // ACT
      const button = screen.getByRole("button");
      await userEvent.click(button);
      const toast = screen.getAllByRole("status")[0];

      // ASSERT
      expect(toast).toHaveTextContent("Updating invoice status ...");
    });

    it("should display 'Invoice status has been updated to pending 🔥' message in toast when status is 'DRAFT'", async () => {
      render(
        <QueryProvider>
          <InvoiceMarkButton status="DRAFT" id={1} />
          <Toaster />
        </QueryProvider>,
      );

      const button = screen.getByRole("button");
      await userEvent.click(button);
      const toast = screen.getAllByRole("status")[0];

      expect(toast).toHaveTextContent(
        "Invoice status has been updated to pending 🔥",
      );
    });

    it("should display 'Invoice status has been updated to paid 🔥' message in toast when status is 'PENDING'", async () => {
      render(
        <QueryProvider>
          <InvoiceMarkButton status="PENDING" id={1} />
          <Toaster />
        </QueryProvider>,
      );

      const button = screen.getByRole("button");
      await userEvent.click(button);
      const toast = screen.getAllByRole("status")[0];

      expect(toast).toHaveTextContent(
        "Invoice status has been updated to paid 🔥",
      );
    });

    it("should display 'Invoice status has been updated to draft 🔥' message in toast when status is 'PAID'", async () => {
      render(
        <QueryProvider>
          <InvoiceMarkButton status="PAID" id={1} />
          <Toaster />
        </QueryProvider>,
      );

      const button = screen.getByRole("button");
      await userEvent.click(button);
      const toast = screen.getAllByRole("status")[0];

      expect(toast).toHaveTextContent(
        "Invoice status has been updated to draft 🔥",
      );
    });

    it("should display 'Something went wrong. Invoice status hasn't been updated' error message in toast when error is not instance of axios", async () => {
      server.use(
        rest.patch("http://localhost:8080/invoice/1", (req, res, ctx) => {
          return res(ctx.status(404));
        }),
      );

      render(
        <QueryProvider>
          <InvoiceMarkButton status="PAID" id={1} />
          <Toaster />
        </QueryProvider>,
      );

      const button = screen.getByRole("button");
      await userEvent.click(button);
      const toast = screen.getAllByRole("status")[0];

      expect(toast).toHaveTextContent(
        "Something went wrong. Invoice status hasn't been updated",
      );
    });
  });
});
