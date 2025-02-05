import React from "react";
import { toast } from "react-toastify";

const CartActions = ({ dispatchCart }) => {
 const addItemToCart = ({ auth, itemDetails, dispatchCart }) => {
    try {
      // Simulate adding item to cart
      dispatchCart({
        type: "ADD-TO-CART",
        payload: itemDetails,
      });
      toast.success("Item Added to Cart");
    } catch (error) {
      console.log("Add Item to Cart Error", error);
      toast.error("Error to add Item in Cart");
    }
  };
  const removeItemFromCart = (itemId) => {
    try {
      dispatchCart({
        type: "REMOVE-FROM-CART",
        payload: itemId, // Mocked item removal, replace with actual logic
      });
      toast.success("Item Removed from Cart");
    } catch (error) {
      console.log("Remove Item from Cart Error", error);
      toast.error("Error to remove Item from Cart");
    }
  };

  const clearCart = () => {
    try {
      dispatchCart({ type: "CLEAR-CART" });
      toast.success("Cart Cleared");
    } catch (error) {
      console.log("Clear Cart Error", error);
      toast.error("Error to Clear Cart");
    }
  };

  return (
    <div>
      <button onClick={() => addItemToCart({ name: "Product1", price: 100 })}>
        Add Item to Cart
      </button>
      <button onClick={() => removeItemFromCart("itemId123")}>
        Remove Item from Cart
      </button>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default CartActions;
