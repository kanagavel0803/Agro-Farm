import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = ({ toggle }) => {
  const navigate = useNavigate();

  // Default login credentials
  const DEFAULT_EMAIL = "test@example.com";
  const DEFAULT_PASSWORD = "Test@123";

  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleLogin = () => {
    if (!emailRegex.test(email)) {
      toast.error("Invalid email! Please enter a valid email with '@'.");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Invalid password! It must contain at least 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    toast.success("Successfully logged in!");
    navigate("/"); // ✅ Navigate to home page
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password"); // ✅ Navigate to forgot password page
  };

  const handleGoogleLogin = () => {
    toast.info("Google Login Clicked!");
    // Google Authentication logic can be added here
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        {/* Left Side - Login Form (White) */}
        <div className="login-panel login-form">
          <h2>Login</h2>

          {/* Google Login Button */}
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            Login with Google
          </button>

          <p>Or Use Your Account</p>

          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Forgot Password Option */}
          <p className="forgot-password" onClick={handleForgotPassword}>
            Forgot Your Password?
          </p>

          <button className="login-btn" onClick={handleLogin}>LOGIN</button>
        </div>

        {/* Right Side - Signup Message (Green) */}
        <div className="signup-panel signup-message">
          <h2>Hello, Friend!</h2>
          <p>Enter Your Personal Details And Start Your Journey With Us</p>
          <button className="signup-btn" onClick={toggle}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
