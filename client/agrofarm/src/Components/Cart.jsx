import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShopContext } from "./ShopContext";
import "./cart.css";



const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(ShopContext);
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const deliveryCharge = totalAmount < 1000 ? 100 : 0;
  const finalAmount = totalAmount + deliveryCharge;

  const handleRemove = (id) => {
    const confirm = window.confirm("Are you sure you want to remove this item?");
    if (confirm) {
      removeFromCart(id);
      toast.error("Removed from cart!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handleBuyNow = (item) => {
    toast.success(`Proceeding to buy ${item.name}`, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const handleCheckout = () => {
  if (cart.length === 0) return;

  console.log("Going to checkout"); // For debugging

  toast.success("Proceeding to checkout", {
    position: "top-right", 
    autoClose: 2000,
  });

  navigate("/checkout", {
    state: {
      cart,
      totalAmount,
      deliveryCharge,
      finalAmount,
    },
  });
};


  const handleQuantityChange = (item, change) => {
    const newQty = (item.quantity || 1) + change;
    if (newQty < 1) return;
    updateQuantity(item.id, newQty);
  };

  return (
    <div className="page-wrapper">
      <div className="cart-container">
        <h2>🛒 Your Shopping Cart</h2>

        {cart.length > 0 ? (
          <>
            <div className="cart-summary">
              <p><strong>Total Items:</strong> {totalItems}</p>
              <p><strong>Sub Total:</strong> ₹{totalAmount}</p>
              <p><strong>Delivery Charges:</strong> ₹{deliveryCharge}</p>
              <p><strong>Final Amount:</strong> ₹{finalAmount}</p>
            </div>

            <div className="cart-grid">
              {cart.map((item) => (
                <div key={item.id} className="cart-card">
                  <img src={item.image} alt={item.name} className="cart-image" />
                  <div className="cart-info">
                    <h3 className="cart-name">{item.name}</h3>
                    <p className="cart-price">₹{item.price} x {item.quantity || 1}</p>

                    <div className="quantity-container">
                      <button className="qty-btn" onClick={() => handleQuantityChange(item, -1)}>−</button>
                      <span className="qty-count">{item.quantity || 1}</span>
                      <button className="qty-btn" onClick={() => handleQuantityChange(item, 1)}>+</button>
                    </div>

                    <div className="cart-actions">
                      <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
                      <button className="buy-btn" onClick={() => handleBuyNow(item)}>Buy Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
            
          </>
        ) : (
          <div className="empty-cart">
            <img src="/images/empty-cart.png" alt="Empty Cart" />
            <p>Your cart is empty. Start shopping now!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
