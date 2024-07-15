import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../config/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(auth?.currentUser?.email);

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/");
  }

  function goHome() {
    navigate("/");
  }

  return (
    <>
      <form className="signup-form">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="signup-form__field"
          aria-label="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Display Name"
          name="name"
          className="signup-form__field"
          aria-label="Enter a display name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="signup-form__field"
          aria-label="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm-password"
          className="signup-form__field"
          aria-label="Confirm password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="signup-form__submit-btn"
          onClick={signIn}
        >
          Sign Up
        </button>

        <button className="signup-form__cancel-btn" onClick={goHome}>
          Cancel
        </button>
      </form>

      <button className="signup-form__google-btn" onClick={signInWithGoogle}>
        Sign In With Google
      </button>

      <button className="signup-form__logout-btn" onClick={signOut}>
        Sign Out
      </button>
    </>
  );
};

export default Auth;
