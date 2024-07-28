import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase.js";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./AccountPage.scss";

const AccountPage = ({ userData }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [userData, setUserData] = useState(userData);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const docRef = doc(db, "users", `${uid}`);
  //       const docSnap = await getDoc(docRef);
  //       if (docSnap.exists()) {
  //         setUserData(docSnap.data());
  //         setError(error);
  //         setLoading(false);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     } catch (error) {
  //       console.error("Error loading data:", error);
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
      setUserData(null);
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
              <Link to={url}>
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
