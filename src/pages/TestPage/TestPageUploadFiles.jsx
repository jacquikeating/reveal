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
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "./TestPage.scss";

const TestPage = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <main className="test-page">
        <section>
          <div>
            <button onClick={onOpenModal}>Open modal</button>
            <Modal open={open} onClose={onCloseModal} center>
              <FirestoreUpload />
            </Modal>
          </div>
        </section>
      </main>
    </div>
  );
};
export default TestPage;
