import RegisterForm from "@/components/RegisterForm/RegisterForm";
import { RegisterType } from "@/components/RegisterForm/formSchema";
import Toaster from "@/components/ui/Toaster";
import { API_URL } from "@/lib/axios";
import { server } from "@/mocks/server";
import { TestQueryProvider } from "@/providers/TestQueryProvider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import toast from "react-hot-toast";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const defaultValues: RegisterType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  avatar: "",
};

const filledDefaultValues: RegisterType = {
  firstName: "Alan",
  lastName: "Walker",
  email: "alan.walker@gmail.com",
  password: "zaq1@WSX",
  confirmPassword: "zaq1@WSX",
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

describe("RegisterForm component", () => {
  describe("Render", () => {
    beforeEach(() => {
      render(
        <TestQueryProvider>
          <RegisterForm defaultValues={defaultValues} />
        </TestQueryProvider>,
      );
    });

    it("should render 'First Name' input", () => {
      const firstNameInput = screen.getByLabelText("First Name");

      expect(firstNameInput).toBeInTheDocument();
    });

    it("should render 'Last Name' input", () => {
      const lastNameInput = screen.getByLabelText("Last Name");

      expect(lastNameInput).toBeInTheDocument();
    });

    it("should render 'Address Email' input", () => {
      const addressEmailInput = screen.getByLabelText("Address Email");

      expect(addressEmailInput).toBeInTheDocument();
    });

    it("should render 'Password' input", () => {
      const passwordInput = screen.getByLabelText("Password");

      expect(passwordInput).toBeInTheDocument();
    });

    it("should render 'Confirm Password' input", () => {
      const confirmPasswordInput = screen.getByLabelText("Confirm Password");

      expect(confirmPasswordInput).toBeInTheDocument();
    });

    it("should render 'Submit' button", () => {
      const submitBtn = screen.getByRole("button", {
        name: "Submit",
      });

      expect(submitBtn).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    describe("Validation", () => {
      beforeEach(() => {
        render(
          <TestQueryProvider>
            <RegisterForm defaultValues={defaultValues} />
          </TestQueryProvider>,
        );
      });

      it("should display 'Required' error message after click submit button when no value in 'First Name' input", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });

        await userEvent.click(submitBtn);

        const firstNameErrorMessage = screen.getByTestId(
          "first-name-error-message",
        );

        expect(firstNameErrorMessage).toHaveTextContent("Required");
      });

      it("should display 'Required' error message after click submit button when no value in 'Last Name' input", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });
        await userEvent.click(submitBtn);

        const lastNameErrorMessage = screen.getByTestId(
          "last-name-error-message",
        );

        expect(lastNameErrorMessage).toHaveTextContent("Required");
      });

      it("should display 'Invalid email' error message after click submit button when no value in 'Address Email' input", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });

        await userEvent.click(submitBtn);

        const addressEmailErrorMessage = screen.getByTestId(
          "address-email-error-message",
        );

        expect(addressEmailErrorMessage).toHaveTextContent("Invalid email");
      });

      it("should display 'Invalid email' error message after click submit button when value in 'Address Email' doesn't contain '@' character", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });

        // Type incorrect value into address email input
        const addressEmailInput = screen.getByLabelText("Address Email");
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

      it("should display 'Passwords don't match' error message when 'Confirm Password' input doesn't have the same value as 'Password' input", async () => {
        const submitBtn = screen.getByRole("button", {
          name: "Submit",
        });

        const passwordInput = screen.getByLabelText("Password");
        await userEvent.type(passwordInput, "zaq1@WSX");

        const confirmPasswordInput = screen.getByLabelText("Confirm Password");
        await userEvent.type(confirmPasswordInput, "zaq1@WS");

        await userEvent.click(submitBtn);

        const confirmPasswordErrorMessage = screen.getByTestId(
          "confirm-password-error-message",
        );

        expect(confirmPasswordErrorMessage).toHaveTextContent(
          "Passwords don't match",
        );
      });

      it("should display 'Invalid url' error message when user paste value to 'Avatar Link' input without 'https://' or 'http://' + some characte", async () => {
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

    describe("toast", () => {
      beforeEach(() => {
        toast.remove();

        render(
          <TestQueryProvider>
            <RegisterForm defaultValues={filledDefaultValues} />
            <Toaster />
          </TestQueryProvider>,
        );
      });

      it("should display 'Account has been created 🔥' message in toast after click submit button when request is success", async () => {
        const submitButton = screen.getByRole("button", {
          name: /Submit/i,
        });
        await userEvent.click(submitButton);

        expect(
          screen.getByText("Account has been created 🔥"),
        ).toBeInTheDocument();
      });

      it("should display 'Creating account ...' message in toast after click submit button when request is processing", async () => {
        server.use(
          rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
            return res(ctx.delay(300), ctx.status(200));
          }),
        );

        const submitButton = screen.getByRole("button", {
          name: /Submit/i,
        });
        await userEvent.click(submitButton);

        expect(screen.getByText("Creating account ...")).toBeInTheDocument();
      });

      it("should display 'Something went wrong. Account hasn't been created' message in toast after click submit button when request is error and is not instance of axios", async () => {
        server.use(
          rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
            return res(ctx.status(403));
          }),
        );

        const submitButton = screen.getByRole("button", {
          name: /Submit/i,
        });
        await userEvent.click(submitButton);

        expect(
          screen.getByText("Something went wrong. Account hasn't been created"),
        ).toBeInTheDocument();
      });

      it("should disabled submit button after click when request is processing", async () => {
        server.use(
          rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
            return res(ctx.delay(300), ctx.status(200));
          }),
        );

        const submitButton = screen.getByRole("button", {
          name: /Submit/i,
        });
        await userEvent.click(submitButton);

        expect(submitButton).toBeDisabled();
      });
    });
  });
});
