import React from "react";
import "./SignupForm.scss";

const SignupForm = () => {
  return (
    <form className="signup-form">
      <input
        type="email"
        placeholder="Email"
        name="email"
        className="signup-form__field"
      />
      <input
        type="text"
        placeholder="Display Name"
        name="name"
        className="signup-form__field"
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="signup-form__field"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirm-password"
        className="signup-form__field"
      />

      <button type="submit" className="signup-form__submit-btn">
        Sign Up
      </button>

      <button className="signup-form__cancel-btn">Cancel</button>
    </form>
  );
};

export default SignupForm;
