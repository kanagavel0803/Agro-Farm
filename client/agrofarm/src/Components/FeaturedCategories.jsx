import React from "react";
import { useNavigate } from "react-router-dom";
import "./FeaturedCategories.css";

const categories = [
  {
    id: 1,
    title: "Sugarcane",
    image: "/images/sugarcane.webp",
  },
  {
    id: 2,
    title: "Paddy",
    image: "/images/paddy.jpg",
  },
  {
    id: 3,
    title: "Vegetable Seeds",
    image: "/images/otherseeds.jpg",
  },
];

const FeaturedCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="categories">
      <h2>Featured Categories</h2>
      <div className="category-container">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={category.image} alt={category.title} />
            <button
              className="shop-button"
              onClick={() => navigate("/shop")}
            >
              {category.title}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
