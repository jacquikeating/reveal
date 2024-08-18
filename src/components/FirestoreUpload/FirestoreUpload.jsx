import { React, useState, useEffect } from "react";
import axios from "axios";
import { db, storage } from "../../config/firebase";
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import "./FirestoreUpload.scss";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const acceptedTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRef = doc(db, "users", userData.uid);

  {
    /* Add more */
  }
  function handleFileChange(e) {
    if (!acceptedTypes.includes(e.target.files[0].type)) {
      console.log("wrong type");
    }
  }

  async function uploadFile() {
    console.log(userData.gallery);

    if (!file) return;
    setUploading(true);
    const filesFolderRef = ref(storage, `user-content/${file.name}`);
    try {
      await uploadBytes(filesFolderRef, file);
      setUploading(false);
      const existingGallery = userData.gallery;
      console.log(existingGallery);
      const updatedGallery = existingGallery.push(
        `https://firebasestorage.googleapis.com/v0/b/reveal-85a73.appspot.com/user-content/${file.name}`
      );
      console.log(updatedGallery);
      userData.gallery = updatedGallery;
      JSON.stringify(userData);
      localStorage.setItem("userData", userData);
      console.log(userData.gallery);
      async function saveData() {
        await updateDoc(userRef, userData);
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      saveData();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="upload-modal">
      <h2>Upload Media</h2>
      <input
        className="upload-modal__input"
        type="file"
        name="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          handleFileChange(e);
        }}
      />
      <button className="upload-modal__button" onClick={uploadFile}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </section>
  );
};

export default FileUploader;
