import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Product } from "./Product";

vi.mock("axios");

describe("Product Component", () => {
  it("displays the product details correctly", () => {
    const product = {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"],
    };
    const fetchCartData = vi.fn();
    render(<Product product={product} fetchCartData={fetchCartData} />);
    expect(
      screen.getByText("Intermediate Size Basketball")
    ).toBeInTheDocument();
    expect(screen.getByText("$20.95")).toBeInTheDocument();
    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/intermediate-composite-basketball.jpg"
    );
    expect(screen.getByTestId("rating-count-image")).toHaveAttribute(
      "src",
      `images/ratings/rating-40.png`
    );
    expect(screen.getByText("127")).toBeInTheDocument();
  });

  it("adds a product to the cart", async () => {
    const product = {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127,
      },
      priceCents: 2095,
      keywords: ["sports", "basketballs"],
    };
    const fetchCartData = vi.fn();
    render(<Product product={product} fetchCartData={fetchCartData} />);

    const user = userEvent.setup();
    const addToCartButton = screen.getByTestId("add-to-cart-button");
    await user.click(addToCartButton);
    expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    });
    expect(fetchCartData).toHaveBeenCalled();
  });
});
