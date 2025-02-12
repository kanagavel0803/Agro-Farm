import React, { useReducer } from "react";

// Initial state for the wishlist
export const wishListInitialState = {
  wishlistItems: [],
};

// Wishlist reducer function to handle various actions
export const wishListReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD-TO-WISHLIST":
    case "UPDATE-WISHLIST":
      return { ...state, wishlistItems: payload };
    case "REMOVE-FROM-WISHLIST":
      return { ...state, wishlistItems: payload };
    case "CLEAR-WISHLIST":
      return wishListInitialState;
    default:
      return state;
  }
};

// React component that uses the wishListReducer
const Wishlist = () => {
  const [state, dispatch] = useReducer(wishListReducer, wishListInitialState);

  // Function to add an item to the wishlist
  const addToWishlist = (newWishlistItems) => {
    dispatch({ type: "ADD-TO-WISHLIST", payload: newWishlistItems });
  };

  // Function to remove an item from the wishlist
  const removeFromWishlist = (updatedWishlistItems) => {
    dispatch({ type: "REMOVE-FROM-WISHLIST", payload: updatedWishlistItems });
  };

  // Function to clear the wishlist
  const clearWishlist = () => {
    dispatch({ type: "CLEAR-WISHLIST" });
  };

  return (
    <div>
      <h2>Wishlist</h2>
      <ul>
        {state.wishlistItems.length === 0 ? (
          <li>No items in your wishlist.</li>
        ) : (
          state.wishlistItems.map((item) => (
            <li key={item._id}>
              <div>
                <p>{item.name}</p>
                <p>Price: ₹{item.price}</p>
                <button
                  onClick={() =>
                    removeFromWishlist(
                      state.wishlistItems.filter(
                        (wishlistItem) => wishlistItem._id !== item._id
                      )
                    )
                  }
                >
                  Remove Item
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <div>
        <button onClick={clearWishlist}>Clear Wishlist</button>
      </div>
    </div>
  );
};

export default wishListReducer;
