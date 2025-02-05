import { Link } from "react-router-dom";
import { useCart } from "../context/cart-context";
import { useWishList } from "../context/wishlist-context";
import { useAuth } from "../context/auth-context";
import { removeItemFromCart } from "../services/cartServices";
import { IsItemInWishList } from "../utils/isItemInWishList";
import { addItemToWishlist, removeItemFromWishlist } from "../services/wishlistServices";

const HorizontalCard = ({ cardDetailsInCart }) => {
  const { _id, title, imgUrl, price, price_old, discount, quantity } = cardDetailsInCart;

  const { dispatchCart } = useCart();
  const { dispatchWishList } = useWishList();
  const { auth } = useAuth();

  const inWishList = IsItemInWishList(_id);

  const handleQuantityChange = (e) => {
    dispatchCart({
      type: "TOGGLE-QUANTITY",
      payload: { _id, quantityValue: e.target.value },
    });
  };

  const handleWishlistToggle = () => {
    if (inWishList) {
      removeItemFromWishlist({ auth, itemId: _id, dispatchWishList });
    } else {
      addItemToWishlist({ auth, itemDetails: cardDetailsInCart, dispatchWishList });
    }
  };

  return (
    <div className="card card-horizontal" id={_id}>
      <div className="card-img-box">
        <Link to={`/product/${_id}`}>
          <img src={imgUrl} alt={title} className="card-img" />
        </Link>
      </div>
      <div className="card-horizontal-content">
        <h4 className="card-title">{title}</h4>

        {/* Quantity Selector */}
        <div className="item-quantity align-center">
          <label htmlFor={`quantity-${_id}`} className="fw-bold">Quantity:</label>
          <input
            type="number"
            id={`quantity-${_id}`}
            name="quantity"
            min="1"
            max="5"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>

        {/* Wishlist Toggle */}
        <i className="material-icons heart-icon" onClick={handleWishlistToggle}>
          {inWishList ? "favorite" : "favorite_border"}
        </i>

        {/* Pricing Details */}
        <div className="card-pricing">
          <p className="card-price">₹{price}</p>
          <p className="card-price-cut">₹{price_old}</p>
          <p className="card-percent-discount">{discount}% off</p>
        </div>

        {/* Remove from Cart Button */}
        <button
          className="btn btn-outline-icon fw-bold"
          onClick={() => removeItemFromCart({ auth, itemId: _id, dispatchCart })}
        >
          <i className="material-icons">remove_shopping_cart</i> Remove
        </button>
      </div>
    </div>
  );
};

export default HorizontalCard;
