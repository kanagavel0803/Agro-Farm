import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const totalItems = state?.totalItems || 0;
  const totalAmount = state?.total || 0;
  const paymentMode = state?.payment || "Not specified";
  const orderId = state?.orderId || `#ORD${Math.floor(Math.random() * 1000000)}`;

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <FaShoppingBag className="confirmation-icon" />
        <h2>Hey,</h2>
        <p>Thanks for your purchase.</p>

        <div className="summary-box">
          <div className="summary-line">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>
          <div className="summary-line">
            <span>Payment Mode</span>
            <span>{paymentMode.toUpperCase()}</span>
          </div>
          <div className="summary-line total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <button className="details-btn">Order Details</button>
        <p className="order-id">Order {orderId}</p>

        <button
          className="continue-btn"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
