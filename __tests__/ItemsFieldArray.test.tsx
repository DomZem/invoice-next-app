import ItemsFieldArray from "@/components/InvoiceForm/Fields/ItemsFieldArray";
import { Item } from "@/components/InvoiceForm/formSchema";
import { InvoiceFormProvider } from "@/providers/InvoiceFormProvider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const price = 12.99;
const quantity = 2;

describe("ItemsFieldArray", () => {
  beforeEach(() => {
    const items: Item[] = [
      {
        name: "bread",
        price,
        quantity,
      },
    ];

    render(
      <InvoiceFormProvider items={items}>
        <ItemsFieldArray />
      </InvoiceFormProvider>,
    );
  });

  describe("Render", () => {
    it("should render 'Item Name' input", () => {
      const itemNameInput = screen.getByLabelText("Item Name");

      expect(itemNameInput).toBeInTheDocument();
    });

    it("should render 'Qty.' input", () => {
      const qtyInput = screen.getByLabelText("Qty.");

      expect(qtyInput).toBeInTheDocument();
    });

    it("should render 'Price' input", () => {
      const priceInput = screen.getByLabelText("Price");

      expect(priceInput).toBeInTheDocument();
    });

    it("should render 'Recycle icon' button", () => {
      const recycleButton = screen.getByRole("button", {
        name: "",
      });

      expect(recycleButton).toBeInTheDocument();
    });

    it("should render 'Add New Item' button", () => {
      const addNewItemButton = screen.getByRole("button", {
        name: /Add New Item/i,
      });

      expect(addNewItemButton).toBeInTheDocument();
    });

    it(`should render '${price * quantity}' as total price`, () => {
      const totalPrice = screen.getByText(`${price * quantity}`);

      expect(totalPrice).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("should add new inputs as list item to list after click 'Add New Item' button", async () => {
      const addNewItemButton = screen.getByRole("button", {
        name: /Add New Item/i,
      });
      await userEvent.click(addNewItemButton);

      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("should remove inputs in list item after click 'Recycle icon' button", async () => {
      const removeListItemButton = screen.getByRole("button", {
        name: "",
      });
      await userEvent.click(removeListItemButton);

      expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    });

    it("should calculate total price after typing price and quantity into inputs", async () => {
      const quantityInput = screen.getByLabelText("Qty.");
      const priceInput = screen.getByLabelText("Price");
      const price = 24.99;
      const quantity = 4;

      await userEvent.clear(quantityInput);
      await userEvent.clear(priceInput);

      await userEvent.type(priceInput, `${price}`);
      await userEvent.type(quantityInput, `${quantity}`);

      const totalPrice = screen.getByText(`${price * quantity}`);

      expect(totalPrice).toBeInTheDocument();
    });
  });
});
