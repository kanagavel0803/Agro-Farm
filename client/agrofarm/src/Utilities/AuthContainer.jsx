import React, { useState } from "react";
import Login from "../Utilities/Login";  // Adjusted path
import Signup from "../Utilities/Signup"; // Adjusted path
import "../Utilities/Auth.css"; // Adjusted path

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-wrapper">
      {/* Background Image with Blur */}
      <div className="auth-bg"></div>

      {/* Content */}
      <div className="auth-content">
        {isLogin ? <Login toggle={toggleForm} /> : <Signup toggle={toggleForm} />}
      </div>
    </div>
  );
};

export default AuthContainer;

