import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Utilities/Header";
import Footer from "./Utilities/Footer";
import Home from "./Components/Home";
import AuthContainer from "./Utilities/AuthContainer";
import ForgotPassword from "./Utilities/ForgotPassword";
import Shop from "./Components/Shop";
import ProfilePage from "./Components/ProfilePage";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";
import BuyNow from "./Components/BuyNow";
import Checkout from "./Components/CheckOut"; 
import OrderConfirmation from "./Components/OrderConfirmation";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />

      <main style={{ minHeight: "calc(100vh - 140px)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/login" element={<AuthContainer />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/buynow" element={<BuyNow />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
