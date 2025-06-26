import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.css";
import FeaturedCategories from "./FeaturedCategories"; // Updated import

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="home">
      <div className="banner">
        <div className="overlay"></div>
        <div className="banner-card">
          <h2>From Our Bag to Your Field</h2>
          <p>
            <span> Your One Stop Destination for Quality Seeds</span>
          </p>
          <button className="shop-now" onClick={() => navigate("/shop")}>
            SHOP NOW
          </button>
        </div>
      </div>
      
      {/* Use the FeaturedCategories component here */}
      <FeaturedCategories />
    </div>
  );
};

export default Home;
