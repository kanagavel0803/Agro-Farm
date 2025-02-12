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
      {isLogin ? <Login toggle={toggleForm} /> : <Signup toggle={toggleForm} />}
    </div>
  );
};

export default AuthContainer;
