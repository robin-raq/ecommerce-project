import axios from "axios";
import dayjs from "dayjs";
import { useState, useEffect, Fragment } from "react";
import { Header } from "../../components/Header";
import "./OrdersPage.css";
import { formatMoney } from "../../utils/money";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrdersData();
  }, []);
  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <div className="orders-grid"></div>
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
                {orderItem.products.map((productItem) => {
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
                        <button className="buy-again-button button-primary">
                          <img
                            className="buy-again-icon"
                            src="images/icons/buy-again.png"
                          />
                          <span className="buy-again-message">Add to Cart</span>
                        </button>
                      </div>

                      <div className="product-actions">
                        <a href="/tracking">
                          <button className="track-package-button button-secondary">
                            Track package
                          </button>
                        </a>
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
