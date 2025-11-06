import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useEffect, useState } from "react";
export function CartItemDetails({ cartItem, fetchCartData }) {
  const [quantity, setQuantity] = useState(1);
  const [updateStatus, setUpdateStatus] = useState(false);
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await fetchCartData();
  };
  const updateQuantity = async () => {
    // Switch between true and false for updateStatus.
    if (updateStatus) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await fetchCartData();
      setUpdateStatus(false);
    } else {
      setUpdateStatus(true);
    }
  };
  const changeQuantity = function (e) {
    console.log(e.target.value);
    setQuantity(e.target.value);
  };
  const manageQuantityAction = function (e) {
    if (e.key === "Enter") {
      updateQuantity();
    } else if (e.key === "Escape") {
      setQuantity(cartItem.quantity);
      setUpdateStatus(false);
    }
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
              <input
                type="text"
                className="quantity-textbox"
                value={quantity}
                onChange={changeQuantity}
                onKeyDown={manageQuantityAction}
              />
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
