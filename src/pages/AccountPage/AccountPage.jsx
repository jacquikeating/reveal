import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase.js";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./AccountPage.scss";

const AccountPage = ({ userData }) => {
  const navigate = useNavigate();
  const auth = getAuth();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      userData = null;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section className="acct-page">
        <h1>Account</h1>
        {userData ? (
          <>
            <p className="acct-page__welcome">Welcome back, {userData.name}!</p>
            <div className="acct-page__btns-container">
              <button className="acct-page__btn" onClick={logOut}>
                <img
                  src="/src/assets/icons/key.svg"
                  className="acct-page__icon"
                />
                Log Out
              </button>
              <Link to={`/profile/${userData.profileURL}`}>
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
