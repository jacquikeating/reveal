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

  function handleFileChange(e) {
    // getExtension(fileName)
    console.log(file.type);
    // if (acceptedTypes.includes(file.type)) {
    //   console.log("match");
    // }
    // console.log(getExtension(e.target.files[0]));
  }

  function getExtension(fileName) {
    return fileName.split(".").pop();
  }

  async function uploadFile() {
    if (!file) return;
    setUploading(true);
    const filesFolderRef = ref(storage, `user-content/${file.name}`);
    try {
      await uploadBytes(filesFolderRef, file);
      setUploading(false);
      // const fileExt = getExtension(selectedFile["name"]).toLowerCase() === "pdf"
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="upload-modal">
      <div>
        <input
          className="upload-modal__input"
          type="file"
          name="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
            handleFileChange();
          }}
        />
        <button className="upload-modal__button" onClick={uploadFile}>
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </div>
    </section>
  );
};

export default FileUploader;
