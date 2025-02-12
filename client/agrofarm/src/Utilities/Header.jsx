import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">Agro<span>Farm</span></div>

      <div className="search-container">
        <input type="text" placeholder="Search products..." className="search-bar" />
      </div>

      <div className="right-section">
      <button className="header-login-btn" onClick={() => navigate("/auth")}>Login</button>

        <div className="icons">
          <span className="icon-item wishlist-icon">
            <FaHeart className="icon" />
          </span>
          <span className="icon-item cart-icon">
            <FaShoppingCart className="icon" />
          </span>
          <span className="icon-item user-profile-icon">
            <FaUser className="icon" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
