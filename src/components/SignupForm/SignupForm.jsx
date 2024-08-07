import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./SignupForm.scss";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();

  const signUp = async (e) => {
    e.preventDefault();
    if (password && password === confirmPW) {
      try {
        await createUserWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // Access the user object within userCredential
            const user = userCredential.user;
            // Save the UID in localStorage
            localStorage.setItem("user", user.uid);
            // Add the name they entered in the form as the displayName in Firebase Auth
            function nameToURL(name) {
              return name
                .toLowerCase()
                .replace(/\W^\s/g, "")
                .replace(/\./g, "")
                .replace(/\s/g, "-");
            }
            updateProfile(auth.currentUser, {
              displayName: `${nameToURL(name)}`,
            });
            // Add user document to users collection in Firestore
            setDoc(doc(db, "users", `${user.uid}`), {
              name: name,
              uid: user.uid,
              email: email,
              profileURL: nameToURL(name),
            });
          }
        );
        navigate("/welcome");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Your passwords did not match. Please re-enter and try again!");
      setPassword("");
      setConfirmPW("");
    }
  };

  return (
    <>
      <form className="signup-form">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="signup-form__field"
          aria-label="Enter your email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="Display Name"
          name="name"
          className="signup-form__field"
          aria-label="Enter a display name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input
          type="password"
          placeholder="Password (min. 6 characters)"
          name="password"
          className="signup-form__field"
          aria-label="Enter your password (minimum 6 characters)"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirm-password"
          className="signup-form__field"
          aria-label="Confirm password"
          required
          onChange={(e) => setConfirmPW(e.target.value)}
          value={confirmPW}
        />
      </form>
      <button className="signup-page__submit-btn" onClick={signUp}>
        Sign Up
      </button>
    </>
  );
};

export default SignupForm;
