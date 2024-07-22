import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase.js";
import { getAuth, signOut } from "firebase/auth";
import { getDoc } from "firebase/firestore";
import "./AccountPage.scss";

const AccountPage = () => {
  const [loggedInUser, setLoggedInUser] = useState("Scarlet");
  const navigate = useNavigate();
  const auth = getAuth();

  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section className="acct-page">
        <h1>Account</h1>
        {loggedInUser ? (
          <>
            <p className="acct-page__welcome">Welcome back, {loggedInUser}!</p>
            <div className="acct-page__btns-container">
              <button className="acct-page__btn" onClick={logOut}>
                <img
                  src="/src/assets/icons/key.svg"
                  className="acct-page__icon"
                />
                Log Out
              </button>
              <Link to="/profile/5">
                <button className="acct-page__btn">
                  <img
                    src="/src/assets/icons/mirror.svg"
                    className="acct-page__icon"
                  />
                  View Profile
                </button>
              </Link>
              <Link to="/profile/edit">
                <button className="acct-page__btn">
                  <img
                    src="/src/assets/icons/edit.svg"
                    className="acct-page__icon acct-page__icon--edit"
                  />
                  Edit Profile
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="acct-page__btns-container">
            <Link to="/login">
              <button className="acct-page__btn">
                <img
                  src="/src/assets/icons/key.svg"
                  className="acct-page__icon"
                />
                Log In
              </button>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default AccountPage;
