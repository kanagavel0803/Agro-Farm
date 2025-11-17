import React from "react";

const ForgotPassword = () => {
  return (
    <div>
      <h2>Reset Your Password</h2>
      <p>Enter your email to receive a password reset link.</p>
      <input type="email" placeholder="Email" />
      <button>Send Reset Link</button>
    </div>
  );
};

export default ForgotPassword;
