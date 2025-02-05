import React, { useReducer } from "react";

// Initial state for the cart
export const cartInitialState = {
  cartItems: [],
  totalPrice: 0,
  totalDiscountPrice: 0,
  totalQuantity: 0,
};

// Cart reducer function to handle various actions
export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD-TO-CART":
    case "UPDATE-CART":
      return {
        ...state,
        cartItems: payload,
        totalQuantity: payload.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: payload.reduce((acc, item) => acc + item.price * item.quantity, 0),
        totalDiscountPrice: payload.reduce(
          (acc, item) => acc + (item.price - item.discount) * item.quantity,
          0
        ),
      };
    case "REMOVE-FROM-CART":
      return {
        ...state,
        cartItems: payload,
        totalQuantity: payload.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: payload.reduce((acc, item) => acc + item.price * item.quantity, 0),
        totalDiscountPrice: payload.reduce(
          (acc, item) => acc + (item.price - item.discount) * item.quantity,
          0
        ),
      };
    case "TOGGLE-QUANTITY":
      return {
        ...state,
        cartItems: toggleQuantity(state, payload),
        totalQuantity: state.cartItems.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        totalDiscountPrice: state.cartItems.reduce(
          (acc, item) => acc + (item.price - item.discount) * item.quantity,
          0
        ),
      };
    case "CLEAR-CART":
      return cartInitialState;
    default:
      return state;
  }
};

// Function to update the quantity of an item in the cart
function toggleQuantity(state, payload) {
  return state.cartItems.map((item) =>
    item._id === payload._id
      ? { ...item, quantity: payload.quantityValue }
      : item
  );
}

// React component that uses the cartReducer
const CartComponent = () => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  // Function to add or update an item in the cart
  const addToCart = (newCartItems) => {
    dispatch({ type: "ADD-TO-CART", payload: newCartItems });
  };

  // Function to remove an item from the cart
  const removeFromCart = (updatedCartItems) => {
    dispatch({ type: "REMOVE-FROM-CART", payload: updatedCartItems });
  };

  // Function to toggle the quantity of an item
  const toggleItemQuantity = (itemId, quantity) => {
    dispatch({ type: "TOGGLE-QUANTITY", payload: { _id: itemId, quantityValue: quantity } });
  };

  // Function to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR-CART" });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {state.cartItems.map((item) => (
          <li key={item._id}>
            <div>
              <p>{item.name}</p>
              <p>Price: ₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => toggleItemQuantity(item._id, item.quantity + 1)}>
                Increase Quantity
              </button>
              <button onClick={() => toggleItemQuantity(item._id, item.quantity - 1)}>
                Decrease Quantity
              </button>
              <button onClick={() => removeFromCart(state.cartItems.filter(cartItem => cartItem._id !== item._id))}>
                Remove Item
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <p>Total Quantity: {state.totalQuantity}</p>
        <p>Total Price: ₹{state.totalPrice}</p>
        <p>Total Discounted Price: ₹{state.totalDiscountPrice}</p>
      </div>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default cartReducer;
