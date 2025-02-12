import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Utilities/Header";
import Footer from "./Utilities/Footer";
import Home from "./Components/Home";
import AuthContainer from "./Utilities/AuthContainer";
import ForgotPassword from "./Utilities/ForgotPassword";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />

      <main style={{ minHeight: "calc(100vh - 140px)" }}>
        <Routes>
          <Route path="/" element={<Home />} /> {/* ✅ Home is still the default page */}
          <Route path="/auth" element={<AuthContainer />} />
          <Route path="/login" element={<AuthContainer />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
export default App;
