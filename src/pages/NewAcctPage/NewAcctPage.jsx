import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase.js";
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import FirestoreUpload from "../../components/FirestoreUpload/FirestoreUpload.jsx";
import "./NewAcctPage.scss";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { batchAddData, usersToAdd } from "../../utils/batch-users.js";

const NewAcctPage = () => {
  return (
    <main>
      <section className="new-acct-page">
        <h1>Welcome to Reveal!</h1>
        <p>Your account was successfully created.</p>
        <p>Where would you like to go next?</p>
        <Link to="/profile/edit">
          <button className="new-acct-page__btn">Edit my profile</button>
        </Link>
        <Link to="/">
          <button className="new-acct-page__btn">Return home</button>
        </Link>
        <Link to="/events">
          <button className="new-acct-page__btn">Find events</button>
        </Link>
      </section>
    </main>
  );
};

export default NewAcctPage;
