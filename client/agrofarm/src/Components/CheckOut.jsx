import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaMoneyBillWave, FaMobileAlt, FaEdit, FaPlus } from "react-icons/fa";
import "./Checkout.css";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cart = state?.cart || [];
  const subTotal = state?.totalAmount || 0;
  const deliveryCharge = state?.deliveryCharge || 0;
  const total = state?.finalAmount || subTotal;

  const [selectedAddress, setSelectedAddress] = useState("Home");
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleOrder = () => {
  if (!selectedPayment) {
    alert("Please select a payment method.");
    return;
  }

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  navigate("/order-confirmation", {
    state: {
      totalItems,
      total: total,
      payment: selectedPayment,
      orderId: `#ORD${Math.floor(Math.random() * 1000000)}`
    },
  });
};


  const handleEditAddress = () => {
    alert("Edit Address coming soon!");
  };

  const handleAddAddress = () => {
    alert("Add Address section coming soon!");
  };

  
  return (
    <div className="checkout-page-wrapper">
      <div className="checkout-container">
        <h2>Checkout</h2>

        {/* Shipping Text */}
        <h3 className="shipping-text">Shipping To</h3>

        {/* Address Section */}
        <div className="address-section">
          <div
            className={`address-card ${selectedAddress === "Home" ? "selected" : ""}`}
            onClick={() => setSelectedAddress("Home")}
          >
            <div className="address-header">
              <strong>Home</strong>
              <FaEdit
                className="edit-icon"
                title="Edit Address"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditAddress();
                }}
              />
            </div>
            <p className="address-text">
              Plate-A, Floor-3, House, R/A, Dhaka, Bangladesh
            </p>
          </div>

          <div
            className={`address-card ${selectedAddress === "New" ? "selected" : ""}`}
            onClick={() => setSelectedAddress("New")}
          >
            <div className="address-header">
              <p>Add Address</p>
              <FaPlus
                className="add-icon"
                title="Add Address"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddAddress();
                }}
              />
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <h3 className="payment-heading">Payment Method</h3>
        <div className="payment-section">
          {[
            {
              label: "Cash on Delivery (COD)",
              value: "cod",
              icon: <FaMoneyBillWave size={20} />,
            },
            {
              label: "UPI Payment (GPay / PhonePe)",
              value: "upi",
              icon: <FaMobileAlt size={20} />,
            },
          ].map((method) => (
            <div
              key={method.value}
              className={`payment-card ${selectedPayment === method.value ? "selected" : ""}`}
              onClick={() => setSelectedPayment(method.value)}
            >
              <input
                type="radio"
                name="payment"
                checked={selectedPayment === method.value}
                readOnly
              />
              <span className="payment-label">{method.label}</span>
              <span className="payment-logo">{method.icon}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="summary">
          <p>Sub Total: <strong>₹{subTotal}</strong></p>
          <p>Delivery Charge: <strong>₹{deliveryCharge}</strong></p>
          <p>Total: <strong>₹{total}</strong></p>
        </div>

        <button className="order-button" onClick={handleOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
