import { React, useState, useEffect } from "react";
import axios from "axios";
import { auth, db, storage } from "../../config/firebase";
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

  {
    /* Add more */
  }
  function handleFileChange(e) {
    if (!acceptedTypes.includes(e.target.files[0].type)) {
      console.log("wrong type");
    }
  }

  async function uploadFile() {
    if (!file) return;
    setUploading(true);
    const filesFolderRef = ref(storage, `user-content/${file.name}`);
    try {
      await uploadBytes(filesFolderRef, file);
      setUploading(false);
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
