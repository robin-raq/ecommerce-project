import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import "./Header.css";

export function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [searchQuery, setSearchQuery] = useState(searchText || "");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };
  const completeSearch = (e) => {
    console.log(e.target.value);
    navigate(`/?search=${searchQuery}`);
  };

  let total = 0;
  cart.forEach((item) => {
    total += item.quantity;
  });
  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />

          <button className="search-button" onClick={completeSearch}>
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">
            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{total}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div>
    </>
  );
}
