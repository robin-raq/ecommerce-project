import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const params = useParams();
  const { orderId, productId } = params;
  const [order, setOrder] = useState(null);
  useEffect(() => {
    axios.get(`/api/orders/${orderId}?expand=products`).then((response) => {
      setOrder(response.data);
      console.log(response.data);
    });
  }, [orderId]);
  // console.log(params);
  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });
  let totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  let timePassedMs = dayjs().valueOf() * 0.3;
  let deliveryPercent = timePassedMs / totalDeliveryTimeMs;
  return (
    <>
      <Header cart={cart} />
      <title>Tracking</title>
      <div className="header">
        <div className="left-section">
          <a href="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </a>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <a className="orders-link header-link" href="/orders">
            <span className="orders-text">Orders</span>
          </a>

          <a className="cart-link header-link" href="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>

      {order && (
        <>
          <div className="tracking-page">
            <div className="order-tracking">
              <a className="back-to-orders-link link-primary" href="/orders">
                View all orders
              </a>

              <div className="delivery-date">
                Arriving on{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D"
                )}
              </div>

              <div className="product-info">{orderProduct.product.name}</div>

              <div className="product-info">
                Quantity: {orderProduct.quantity}
              </div>

              <img className="product-image" src={orderProduct.product.image} />

              <div className="progress-labels-container">
                <div className="progress-label">Preparing</div>
                <div className="progress-label current-status">Shipped</div>
                <div className="progress-label">Delivered</div>
              </div>

              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${deliveryPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
