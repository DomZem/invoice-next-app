import HomePage from "@/app/(marketing)/(main)/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("HomePage", () => {
  it("should render a heading", () => {
    // ARRANGE
    render(<HomePage />);

    // ACT
    const heading = screen.getByRole("heading", {
      name: "Easiest way to manage your invoices",
    });

    // ASSERT
    expect(heading).toBeInTheDocument();
  });

  it("should render a register link", () => {
    render(<HomePage />);

    const registerLink = screen.getByRole("link", {
      name: "Register account",
    });

    expect(registerLink).toBeInTheDocument();
  });
});
