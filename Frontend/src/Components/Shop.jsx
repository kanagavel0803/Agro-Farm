import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart, faTimes, faSeedling, faCandyCane, faCarrot } from "@fortawesome/free-solid-svg-icons";
import { ShopContext } from "./ShopContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import "./Shop.css";
import BuyNow from "./BuyNow";


const products = [
  // Vegetable Seeds
  { id: 1, name: "Tomato Seed", price: 500, category: "Vegetable Seeds", image: "/images/Tomato-seed.png" },
  { id: 2, name: "Brinjal Seed", price: 450, category: "Vegetable Seeds", image: "/images/Brinjal.jpg" },
  { id: 3, name: "Okra Seed", price: 400, category: "Vegetable Seeds", image: "/images/Okra.avif" },
  { id: 4, name: "Beans Seed", price: 480, category: "Vegetable Seeds", image: "/images/Beans-seed.png" },
  { id: 5, name: "Chilies Seed", price: 520, category: "Vegetable Seeds", image: "/images/Chilly.webp" },
  { id: 16, name: "Pumpkin Seed", price: 320, category: "Vegetable Seeds", image: "/images/Pumpkin-seed.png" },

  // Sugarcane
  { id: 6, name: "Sugarcane-COG 93076", price: 1500, category: "Sugarcane", image: "/images/Sugarcane-COG 93076.png" },
  { id: 7, name: "Sugarcane-COG 94077", price: 1550, category: "Sugarcane", image: "/images/COG 94077.jpg" },
  { id: 8, name: "Sugarcane-CO 95076", price: 1600, category: "Sugarcane", image: "/images/CO 95076.jpg" },
  { id: 9, name: "Sugarcane-CoV 94101", price: 1580, category: "Sugarcane", image: "/images/CoV94101.png" },
  { id: 10, name: "Sugarcane-Co 86027", price: 1520, category: "Sugarcane", image: "/images/Co86027.png" },

  // Paddy
  { id: 11, name: "Seeraga Samba", price: 1100, category: "Paddy", image: "/images/Seeraga Samba.webp" },
  { id: 12, name: "Mappillai Samba", price: 1150, category: "Paddy", image: "/images/Mappillai Samba.jpg" },
  { id: 13, name: "Karunkuruvai", price: 1080, category: "Paddy", image: "/images/Karunkuruvai.webp" },
  { id: 15, name: "Onmani (CR 1009)", price: 1180, category: "Paddy", image: "/images/Onmani (CR 1009).jpg" },
];

const categories = [
  { name: "Sugarcane", icon: faCandyCane },
  { name: "Paddy", icon: faSeedling },
  { name: "Vegetable Seeds", icon: faCarrot }
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [quantities, setQuantities] = useState({});
  const {  addToCart } = useContext(ShopContext);

  const handleCategoryChange = (category) => {
    if (selectedCategory.includes(category)) {
      setSelectedCategory(selectedCategory.filter((item) => item !== category));
    } else {
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + change),
    }));
  };

  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory.length === 0 ||
      selectedCategory.includes(product.category)
  );

  if (sortOrder === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
     <div className="page-wrapper">
    <div className="shop-container">
      {/* Enhanced Filter Section */}
      <div className="filter-card">
        <div className="filter-header">
          <h2>Filters</h2>
          <button 
            className="clear-button" 
            onClick={() => {
              setSelectedCategory([]);
              setSortOrder("");
            }}
          >
            <FontAwesomeIcon icon={faTimes} /> CLEAR
          </button>
        </div>

        <div className="filter-group">
          <label>Categories</label>
          {categories.map((category) => (
            <label key={category.name} className="option">
              <input
                type="checkbox"
                checked={selectedCategory.includes(category.name)}
                onChange={() => handleCategoryChange(category.name)}
              />
              <span className="category-icon">
                <FontAwesomeIcon icon={category.icon} />
              </span>
              {category.name}
            </label>
          ))}
        </div>
       
        <div className="filter-group">
          <label>Sort By</label>
          <label className="option">
            <input
              type="radio"
              name="sort"
              value="low"
              checked={sortOrder === "low"}
              onChange={() => setSortOrder("low")}
            />
            Price: Low to High
          </label>
          <label className="option">
            <input
              type="radio"
              name="sort"
              value="high"
              checked={sortOrder === "high"}
              onChange={() => setSortOrder("high")}
            />
            Price: High to Low
          </label>
        </div>
      </div>

      {/* Product Section */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-details">
                <p className="product-code">Code #{product.id}</p>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price}</p>

                <div className="quantity-container">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(product.id, -1)}
                  >
                    −
                  </button>
                  <span className="quantity-input">{quantities[product.id] || 1}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(product.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="buy-cart-wrapper">
  <button
  className="buy-button"
  onClick={() =>
    navigate("/buynow", {
      state: {
        product: {
          ...product,
          quantity: quantities[product.id] || 1
        }
      }
    })
  }
>
  BUY NOW
</button>

  <FontAwesomeIcon
    icon={faShoppingCart}
    className="shop-cart-icon"
    onClick={() => {
      addToCart({ ...product, quantity: quantities[product.id] || 1 });
      toast.success(`${product.name} added to cart!`);
    }}
  />
</div>

            </div>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>

     <ToastContainer position="top-right" autoClose={1500} style={{ marginTop: '60px' }} />

    </div>
    </div>
  );
};

export default Shop;
