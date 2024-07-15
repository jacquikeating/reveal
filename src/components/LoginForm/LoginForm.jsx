import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.scss";

const LoginForm = () => {
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/");
  }

  function goHome() {
    navigate("/");
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="login-form__field"
        aria-label="Enter your email"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="login-form__field"
        aria-label="Enter your password"
      />
      <button type="submit" className="login-form__submit-btn">
        Log In
      </button>

      <button className="login-form__cancel-btn" onSubmit={goHome}>
        Cancel
      </button>
    </form>
  );
};

export default LoginForm;
