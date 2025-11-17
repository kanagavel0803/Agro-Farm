import React, { useContext } from "react";
import { ShopContext } from "./ShopContext";
import "./wishlist.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(ShopContext);

  const handleRemove = (id) => {
    removeFromWishlist(id);
    toast.info("Removed from wishlist!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-card">
              <img src={item.image} alt={item.name} className="wishlist-image" />
              <div className="wishlist-info">
                <h3 className="wishlist-name">{item.name}</h3>
                <p className="wishlist-price">₹{item.price}</p>
                <div className="wishlist-actions">
                <button 
                     className="remove-btn" 
                      onClick={() => handleRemove(item.id)}
                        >
                               Remove
                </button>
                <button 
                     className="buy-btn"
                     onClick={() => alert(`Buying ${item.name} for ₹${item.price}`)}
                    >
                         Buy Now
                      </button>
                     </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
