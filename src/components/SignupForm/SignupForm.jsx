import React from "react";
import { useNavigate } from "react-router-dom";

import "./SignupForm.scss";

const SignupForm = () => {
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/");
  }

  function goHome() {
    navigate("/");
  }

  return (
    <form className="signup-form">
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="signup-form__field"
        aria-label="Enter your email"
      />
      <input
        type="text"
        placeholder="Display Name"
        name="name"
        className="signup-form__field"
        aria-label="Enter a display name"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="signup-form__field"
        aria-label="Enter your password"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirm-password"
        className="signup-form__field"
        aria-label="Confirm password"
      />

      <button
        type="submit"
        className="signup-form__submit-btn"
        onClick={handleSubmit}
      >
        Sign Up
      </button>

      <button className="signup-form__cancel-btn" onClick={goHome}>
        Cancel
      </button>
    </form>
  );
};

export default SignupForm;
