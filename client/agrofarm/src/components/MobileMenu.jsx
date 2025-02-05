import { Link } from "react-router-dom";
import "../styles/components/mobileMenu.css";
import { useAuth } from "../context/auth-context";

export const MobileMenu = ({
  mobileMenuStatus,
  setMobileMenuStatus,
  logoutHandler,
  wishlistItemsCount,
  cartItemsCount,
}) => {
  const { auth } = useAuth();
  const mobileClassName = `mobile-menu ${mobileMenuStatus ? "show-menu" : ""}`;

  return (
    <div className={mobileClassName}>
      {/* Header */}
      <div className="mobile-menu-head">
        <Link to="/">
          <h1 className="mobile-logo">
            Agro<span className="dark-brown-color">Stores</span>
          </h1>
        </Link>
        <span
          className="material-icons mobile-menu-close"
          onClick={() => setMobileMenuStatus((prev) => !prev)}
          role="button"
          aria-label="Close menu"
        >
          close
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="mobile-menu-links">
        <Link to="/products" className="link-mobile-menu fw-bold pd-sm">
          Show All Products
        </Link>
        <Link to="/search" className="link-mobile-menu fw-bold pd-sm">
          Search Products
        </Link>
        <Link to="/cart" className="link-mobile-menu fw-bold pd-sm">
          Cart ({cartItemsCount})
        </Link>
        <Link to="/wishlist" className="link-mobile-menu fw-bold pd-sm">
          Wishlist ({wishlistItemsCount})
        </Link>
        <Link to="/profile" className="link-mobile-menu fw-bold pd-sm">
          My Profile
        </Link>
      </nav>

      {/* Authentication Button */}
      {auth?.token ? (
        <button className="btn btn-solid" onClick={logoutHandler}>
          Logout
        </button>
      ) : (
        <Link to="/login" className="btn btn-solid btn-login">
          Login
        </Link>
      )}
    </div>
  );
};
