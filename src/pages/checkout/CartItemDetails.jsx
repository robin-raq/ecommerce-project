import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";
export function CartItemDetails({ cartItem, fetchCartData }) {
  const [updateStatus, setUpdateStatus] = useState(false);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await fetchCartData();
  };
  const updateQuantity = function () {
    setUpdateStatus(!updateStatus);
  };
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {updateStatus ? (
              <input type="text" className="quantity-textbox" />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
