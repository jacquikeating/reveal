import React from "react";
import "./LoginForm.scss";

const LoginForm = () => {
  return (
    <form className="login-form">
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="login-form__field"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="login-form__field"
      />
      <button type="submit" className="login-form__submit-btn">
        Log In
      </button>

      <button className="login-form__cancel-btn">Cancel</button>
    </form>
  );
};

export default LoginForm;
