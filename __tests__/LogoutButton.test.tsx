import LogoutButton from "@/components/LogoutButton";
import Toaster from "@/components/ui/Toaster";
import { server } from "@/mocks/server";
import { TestQueryProvider } from "@/providers/TestQueryProvider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import toast from "react-hot-toast";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    };
  },
}));

const processingMessage = "Logging out ...";
const successMessage = "You have been logged out";
const errorMessage = "Something went wrong. You have not been logged out";

describe("LogoutButton", () => {
  describe("Render", () => {
    it("should render logout button", () => {
      render(
        <TestQueryProvider>
          <LogoutButton />
        </TestQueryProvider>,
      );

      expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    beforeEach(() => {
      toast.remove();

      render(
        <TestQueryProvider>
          <LogoutButton />
          <Toaster />
        </TestQueryProvider>,
      );
    });

    it(`should display '${processingMessage}' message in toast when request is processing`, async () => {
      server.use(
        rest.get("http://localhost:8080/auth/logout", (req, res, ctx) => {
          return res(ctx.delay(300), ctx.status(200));
        }),
      );

      const logoutButton = screen.getByRole("button", {
        name: "",
      });

      await userEvent.click(logoutButton);

      const toast = screen.getByRole("status");

      expect(toast).toHaveTextContent(processingMessage);
    });

    it(`should display '${successMessage} message in toast when request is success'`, async () => {
      const logoutButton = screen.getByRole("button", {
        name: "",
      });

      await userEvent.click(logoutButton);

      const toast = screen.getByRole("status");

      expect(toast).toHaveTextContent(successMessage);
    });

    it(`should display '${errorMessage}' error message in toast when error is not instance of axios `, async () => {
      server.use(
        rest.get("http://localhost:8080/auth/logout", (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      );

      const logoutButton = screen.getByRole("button", {
        name: "",
      });

      await userEvent.click(logoutButton);

      const toast = screen.getByRole("status");

      expect(toast).toHaveTextContent(errorMessage);
    });
  });
});
