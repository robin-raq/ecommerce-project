import axios from "axios";
import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { Fragment } from "react";
import { Link } from "react-router";
export function OrdersGrid({ orders, fetchCartData }) {
  return (
    <>
      <div className="orders-grid">
        {orders.map((orderItem) => {
          return (
            <div className="order-container" key={orderItem.id}>
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(orderItem.orderTimeMs).format("MMMM D")}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatMoney(orderItem.totalCostCents)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{orderItem.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                {}
                {orderItem.products.map((productItem) => {
                  const addToCart = async () => {
                    await axios.post("/api/cart-items", {
                      productId: productItem.product.id,
                      quantity: 1,
                    });
                    await fetchCartData();
                  };

                  return (
                    <Fragment key={productItem.product.id}>
                      <div className="product-image-container">
                        <img src={productItem.product.image} />
                      </div>

                      <div className="product-details">
                        <div className="product-name">
                          {productItem.product.name}
                        </div>
                        <div className="product-delivery-date">
                          Arriving on:{" "}
                          {dayjs(orderItem.estimatedDeliveryTimeMs).format(
                            "MMMM D"
                          )}
                        </div>
                        <div className="product-quantity">
                          Quantity: {orderItem.quantity}
                        </div>
                        <button
                          className="buy-again-button button-primary"
                          onClick={addToCart}
                        >
                          <img
                            className="buy-again-icon"
                            src="images/icons/buy-again.png"
                          />
                          <span className="buy-again-message">Add to Cart</span>
                        </button>
                      </div>

                      <div className="product-actions">
                        <Link
                          to={`/tracking/${orderItem.id}/${productItem.product.id}`}
                        >
                          <button className="track-package-button button-secondary">
                            Track package
                          </button>
                        </Link>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
