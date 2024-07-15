import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase.js";
import { signOut } from "firebase/auth";
import "./LogOutBtn.scss";

export const LogOutBtn = () => {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button className="signup-page__cancel-btn" onClick={logOut}>
      Sign Out
    </button>
  );
};

export default LogOutBtn;
