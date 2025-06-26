import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate("/shop", { state: { query: searchQuery.toLowerCase() } });
      setSearchQuery(""); // clear input
    }
  };

  return (
    <header className="header">
      <div className="logo">Agro<span>Farm</span></div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch} // handle Enter key
        />
      </div>

      <div className="right-section">
        <button className="header-login-btn" onClick={() => navigate("/auth")}>Login</button>

        <div className="icons">
          <span className="icon-item home-icon" onClick={() => navigate("/")}>
            <FaHome className="icon" />
          </span>
          <span className="icon-item cart-icon" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="icon" />
          </span>
          <span className="icon-item user-profile-icon" onClick={() => navigate("/profile")}>
            <FaUser className="icon" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
