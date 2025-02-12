import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Signup = ({ toggle }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleSignup = () => {
    if (!emailRegex.test(email)) {
      toast.error("Invalid email! Please enter a valid email with '@'.");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Weak password! It must contain at least 1 lowercase letter, 1 number, and 1 special character."
      );
      return;
    }

    toast.success("Successfully signed up! Please log in.");
    toggle(); // Navigate to login form
  };

  const handleGoogleSignup = () => {
    toast.info("Google Signup feature will be added soon!");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        {/* Left Side - Signup Form (White) */}
        <div className="signup-panel signup-form">
          <h2>Create Account</h2>
          <button className="google-signup-btn" onClick={handleGoogleSignup}>
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            Sign Up with Google
          </button>

          <p>Or Use Your Email For Registration</p>
          <input
            className="signup-input"
            type="text"
            placeholder="Name"
          />
          <input
            className="signup-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signup-btn" onClick={handleSignup}>SIGN UP</button>
        </div>

        {/* Right Side - Login Message (Green) */}
        <div className="login-panel login-message">
          <h2>Welcome Back!</h2>
          <p>To Keep Connected With Us Please Login With Your Personal Info</p>
          <button className="login-btn" onClick={toggle}>LOGIN</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
