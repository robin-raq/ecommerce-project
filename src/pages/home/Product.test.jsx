import { it, expect, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { formatMoney } from "../../utils/money";
import { Product } from "./Product";

describe("Product Component", () => {
  it("displats the product details correctly", () => {
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
    const loadCart = vi.fn();
    render(<Product product={product} loadCart={loadCart} />);
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
});
