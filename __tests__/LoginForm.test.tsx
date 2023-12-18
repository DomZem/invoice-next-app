import LoginForm from "@/components/LoginForm/LoginForm";
import QueryProvider from "@/providers/QueryProvider";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    render(
      <QueryProvider>
        <LoginForm />
      </QueryProvider>,
    );
  });

  describe("Render", () => {
    it("should render email input", () => {
      const emailInput = screen.getByLabelText("Address email");

      expect(emailInput).toBeInTheDocument();
    });

    it("should render password input", () => {
      const passwordInut = screen.getByLabelText("Password");

      expect(passwordInut).toBeInTheDocument();
    });

    it("should render submit button", () => {
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });

      expect(submitBtn).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should display error message if there is no value in email input after click submit button", async () => {
      // Write value into password input
      const passwordInput = screen.getByLabelText("Password");
      await userEvent.type(passwordInput, "HeeloThere");

      // Click submit button
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });
      await userEvent.click(submitBtn);

      // Get error message
      const errorMessage = screen.getByText(/Required/i);

      expect(errorMessage).toBeInTheDocument();
    });

    it("should display error message if there is no value in password input after click submit button", async () => {
      // Write value into email input
      const emailInput = screen.getByLabelText("Address email");
      await userEvent.type(emailInput, "anakin@gmail.com");

      // Click submit button
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });
      await userEvent.click(submitBtn);

      // Get error message
      const errorMessage = screen.getByText(/Required/i);

      expect(errorMessage).toBeInTheDocument();
    });

    it("should prevent call submit function if there is no value in email input", async () => {
      const mockMutatefn = jest.fn();

      jest.mock("@tanstack/react-query", () => ({
        useMutation: jest.fn().mockReturnValue({
          isPending: false,
          mutate: mockMutatefn(),
        }),
      }));

      // Write value into password input
      const passwordInput = screen.getByLabelText("Password");
      await userEvent.type(passwordInput, "hellothere");

      // Click submit button
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });
      await userEvent.click(submitBtn);

      expect(mockMutatefn).not.toHaveBeenCalled();

      jest.restoreAllMocks();
    });

    it("should prevent call submit function if there is no value in password input", async () => {
      const mockMutatefn = jest.fn();

      jest.mock("@tanstack/react-query", () => ({
        useMutation: jest.fn().mockReturnValue({
          isPending: false,
          mutate: mockMutatefn(),
        }),
      }));

      // Write value into email input
      const emailInput = screen.getByLabelText("Address email");
      await userEvent.type(emailInput, "anakin@gmail.com");

      // Click submit button
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });
      await userEvent.click(submitBtn);

      expect(mockMutatefn).not.toHaveBeenCalled();

      jest.restoreAllMocks();
    });
  });
});
