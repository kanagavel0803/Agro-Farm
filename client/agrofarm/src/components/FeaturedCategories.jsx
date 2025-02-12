import React from "react";
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
  return (
    <section className="categories">
      <h2>Featured Categories</h2>
      <div className="category-container">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={category.image} alt={category.title} />
            <h3>{category.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
