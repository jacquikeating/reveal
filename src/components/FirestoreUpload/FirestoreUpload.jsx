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
  const [showExtraInputs, setShowExtraInputs] = useState(false);
  const [captionText, setCaptionText] = useState(null);
  const [eventLink, setEventLink] = useState(null);
  const [uploading, setUploading] = useState(false);
  const acceptedTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg",
  ];
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userRef = doc(db, "users", userData.uid);
  const [uploadStatusMessage, setUploadStatusMessage] = useState("");

  {
    /* Add more */
  }
  function handleFileChange(e) {
    if (!acceptedTypes.includes(e.target.files[0].type)) {
      setUploadStatusMessage("Sorry, that file type is not supported.");
    } else {
      setUploadStatusMessage("");
      setShowExtraInputs(true);
    }
  }

  async function uploadFile() {
    if (!file) return;
    setUploading(true);
    const filesFolderRef = ref(storage, `user-content/${file.name}`);
    let finalCaption = "";
    let eventName = "";
    let eventID = eventLink.substr(29);
    function generateCaptionWithLink() {
      if (eventLink) {
        async function getEventData() {
          const docRef = doc(db, "events", eventID);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            eventName = docSnap.data().name;
            finalCaption = `<p class='caption'>${captionText} <span class='caption__event'>Taken at <a href=${eventLink} class='caption__link'>${eventName}</a></span></p>`;
          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        }
        getEventData();
      } else {
        finalCaption = `<p className='caption'>${captionText}</p>`;
      }
    }
    generateCaptionWithLink();
    try {
      await uploadBytes(filesFolderRef, file);
      setUploading(false);
      const tempUserData = userData;
      const existingGallery = userData.gallery;
      const updatedGallery = [...existingGallery];

      updatedGallery.push({
        url: `https://firebasestorage.googleapis.com/v0/b/reveal-85a73.appspot.com/o/user-content%2F${file.name}?alt=media`,
        caption: finalCaption,
      });
      tempUserData.gallery = updatedGallery;
      async function saveData() {
        await updateDoc(userRef, userData);
        localStorage.setItem("userData", JSON.stringify(tempUserData));
        setUploadStatusMessage("Your image was uploaded successfully.");
      }
      saveData();
      setShowExtraInputs(false);
    } catch (error) {
      console.error(error);
      setUploadStatusMessage("Sorry, your image could not be uploaded.");
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
      {showExtraInputs ? (
        <div className="upload-modal__extra-inputs">
          <p className="upload-modal__message">{uploadStatusMessage}</p>
          <label for="caption" className="upload-modal__label">
            Enter a caption:
            <input
              className="upload-modal__input"
              type="text"
              name="caption"
              maxLength="200"
              onChange={(e) => {
                setCaptionText(e.target.value);
              }}
            />
          </label>

          <label for="event-link" className="upload-modal__label">
            Link to an event page:
            <input
              className="upload-modal__input"
              type="text"
              name="event-link"
              onChange={(e) => {
                setEventLink(e.target.value);
              }}
            />
          </label>
        </div>
      ) : (
        ""
      )}
      <button className="upload-modal__button" onClick={uploadFile}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </section>
  );
};

export default FileUploader;
