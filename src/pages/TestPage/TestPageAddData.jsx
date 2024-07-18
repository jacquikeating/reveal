import React from "react";
import React, { useState, useEffect, useMemo } from "react";
import { db } from "../../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { users } from "../../utils/starting-data.js";
import "./TestPage.scss";

const TestPage = () => {
  const eventsCollectionRef = collection(db, "events");
  const usersCollectionRef = collection(db, "users");

  const uploadData = async (collectionRef, dataArr) => {
    try {
      for (const data of dataArr) {
        await addDoc(collectionRef, data);
      }
      console.log("Data successfully uploaded!");
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
  };

  return (
    <div>
      <main className="test-page">
        <section>
          <button
            onClick={() => {
              uploadData(COLLECTION, ARRAY);
              // lines:      9         5
            }}
          >
            Add Data
          </button>
        </section>
      </main>
    </div>
  );
};

export default TestPage;
