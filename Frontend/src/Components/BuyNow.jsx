// BuyNow.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BuyNow.css";

const BuyNow = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  if (!product) return <p>No product found. Please go back to the shop.</p>;

  const quantity = product.quantity || 1;
  const subTotal = product.price * quantity;
  const deliveryCharge = subTotal < 1000 ? 100 : 0;
  const finalAmount = subTotal + deliveryCharge;


  return (
    <div className="page-wrapper">
        <h1>BuyNow</h1>
      <div className="buy-now-page">
        <div className="buy-now-card">
          <img src={product.image} alt={product.name} className="buy-now-image" />
          <h2>{product.name}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity || 1}</p>
          <p><strong>Total:</strong> ₹{subTotal}</p>
          <p><strong>Delivery:</strong> ₹{deliveryCharge}</p>
          <p><strong>Final:</strong> ₹{finalAmount}</p>


           <button
      className="confirm-btn"
      onClick={() =>
        navigate("/checkout", {
          state: {
            cart: [product],
            totalAmount: subTotal,
            deliveryCharge,
            finalAmount,
          },
        })
      }
    >
      CheckOut
    </button>

          <button className="back-btn" onClick={() => navigate("/")}>
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
