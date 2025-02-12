import React from "react";
import "./Home.css";
import FeaturedCategories from "./FeaturedCategories"; // Updated import

const Home = () => {
  return (
    <div className="home">
      <div className="banner">
        <div className="overlay"></div>
        <div className="banner-card">
          <h1>One Stop Solution for your farming needs</h1>
          <p>
            <span>Buy Fertilizers, Insecticides, Seeds & other Agriculture Products</span>
          </p>
          <button className="shop-now">SHOP NOW</button>
        </div>
      </div>
      
      {/* Use the FeaturedCategories component here */}
      <FeaturedCategories />
    </div>
  );
};

export default Home;
