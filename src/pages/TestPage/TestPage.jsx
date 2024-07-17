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
import NavExpand from "../../components/NavExpand/NavExpand.jsx";
import "./TestPage.scss";

const TestPage = () => {
  return (
    <div>
      <main className="test-page">
        <section>
          <NavExpand />
        </section>
      </main>
    </div>
  );
};
export default TestPage;
