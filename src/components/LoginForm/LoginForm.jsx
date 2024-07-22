import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./LoginForm.scss";

const LoginForm = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    navigate("/");
  }

  function handleEmailChange(e) {
    console.log(e.target.value);
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
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
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        className="login-form__field"
        aria-label="Enter your password"
        value={password}
        onChange={handlePasswordChange}
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
