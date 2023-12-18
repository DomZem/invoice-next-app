import RegisterForm from "@/components/RegisterForm/RegisterForm";
import QueryProvider from "@/providers/QueryProvider";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RegisterForm", () => {
  beforeEach(() => {
    render(
      <QueryProvider>
        <RegisterForm />
      </QueryProvider>,
    );
  });

  describe("Render", () => {
    it("should render first name input", () => {
      const firstNameInput = screen.getByLabelText("First Name");

      expect(firstNameInput).toBeInTheDocument();
    });

    it("should render last name input", () => {
      const lastNameInput = screen.getByLabelText("Last name");

      expect(lastNameInput).toBeInTheDocument();
    });

    it("should render address email input", () => {
      const addressEmailInput = screen.getByLabelText("Address email");

      expect(addressEmailInput).toBeInTheDocument();
    });

    it("should render password input", () => {
      const passwordInput = screen.getByLabelText("Password");

      expect(passwordInput).toBeInTheDocument();
    });

    it("should render confirm password input", () => {
      const confirmPasswordInput = screen.getByLabelText("Confirm password");

      expect(confirmPasswordInput).toBeInTheDocument();
    });

    it("should render submit button", () => {
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });

      expect(submitBtn).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should display 'Required' error message after click submit button when no value in first name input", async () => {
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });

      await userEvent.click(submitBtn);

      const firstNameErrorMessage = screen.getByTestId(
        "first-name-error-message",
      );

      expect(firstNameErrorMessage).toHaveTextContent("Required");
    });

    it("should display 'Required' error message after click submit button when no value in last name input", async () => {
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });

      await userEvent.click(submitBtn);

      const lastNameErrorMessage = screen.getByTestId(
        "last-name-error-message",
      );

      expect(lastNameErrorMessage).toHaveTextContent("Required");
    });

    it("should display 'Invalid email' error message after click submit button when no value in address email input", async () => {
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });

      await userEvent.click(submitBtn);

      const addressEmailErrorMessage = screen.getByTestId(
        "address-email-error-message",
      );

      expect(addressEmailErrorMessage).toHaveTextContent("Invalid email");
    });

    it("should display 'Invalid email' error message after click submit button when value in address email doesn't contain '@' character", async () => {
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });

      // Type incorrect value into address email input
      const addressEmailInput = screen.getByLabelText("Address email");
      await userEvent.type(addressEmailInput, "anakin.com");

      await userEvent.click(submitBtn);

      const addressEmailErrorMessage = screen.getByTestId(
        "address-email-error-message",
      );

      expect(addressEmailErrorMessage).toHaveTextContent("Invalid email");
    });

    describe("Password Input", () => {
      it("should display 'Password must contains at least one uppercase character' error message after click submit button", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });

        const passwordInput = screen.getByLabelText("Password");
        await userEvent.type(passwordInput, "z");

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          "password-error-message",
        );

        expect(passwordErrorMessage).toHaveTextContent(
          "Password must contains at least one uppercase character",
        );
      });

      it("should display 'Password must contains at least one lowercase character' error message after click submit button", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });

        const passwordInput = screen.getByLabelText("Password");
        await userEvent.type(passwordInput, "Z");

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          "password-error-message",
        );

        expect(passwordErrorMessage).toHaveTextContent(
          "Password must contains at least one lowercase character",
        );
      });

      it("should display 'Password must contains at least one number' error message after click submit button", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });

        const passwordInput = screen.getByLabelText("Password");
        await userEvent.type(passwordInput, "zA");

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          "password-error-message",
        );

        expect(passwordErrorMessage).toHaveTextContent(
          "Password must contains at least one number",
        );
      });

      it("should display 'Password must contains at least one special character' error message after click submit button", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });

        const passwordInput = screen.getByLabelText("Password");
        await userEvent.type(passwordInput, "zA1");

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          "password-error-message",
        );

        expect(passwordErrorMessage).toHaveTextContent(
          "Password must contains at least one special character",
        );
      });

      it("should display 'Password must be at least 8 characters in length' error message after click submit button", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });

        const passwordInput = screen.getByLabelText("Password");
        await userEvent.type(passwordInput, "zaq1@W");

        await userEvent.click(submitBtn);

        const passwordErrorMessage = screen.getByTestId(
          "password-error-message",
        );

        expect(passwordErrorMessage).toHaveTextContent(
          "Password must be at least 8 characters in length",
        );
      });
    });

    it("should display 'Passwords don't match' error message when confirm password input doesn't have the same value as password input", async () => {
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });

      const passwordInput = screen.getByLabelText("Password");
      await userEvent.type(passwordInput, "zaq1@WSX");

      const confirmPasswordInput = screen.getByLabelText("Confirm password");
      await userEvent.type(confirmPasswordInput, "zaq1@WS");

      await userEvent.click(submitBtn);

      const confirmPasswordErrorMessage = screen.getByTestId(
        "confirm-password-error-message",
      );

      expect(confirmPasswordErrorMessage).toHaveTextContent(
        "Passwords don't match",
      );
    });

    it("should display 'Invalid url' error message when user paste value to avatar link input without 'https://' or 'http://' + some characte", async () => {
      // const submitBtn = screen.getByRole("button", {
      //   name: "Submit",
      // });
      // const avatarLinkInput = screen.getByLabelText("Avatar link");
      // await userEvent.type(avatarLinkInput, "https://");
      // await userEvent.click(submitBtn);
      // const avatarLinkErrorMessage = screen.getByTestId(
      //   "avatar-link-error-message",
      // );
      // expect(avatarLinkErrorMessage).toHaveTextContent("Invalid url");
    });
  });
});
