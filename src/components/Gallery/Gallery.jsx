import { useState } from "react";
import VideoPlayer from "/src/components/VideoPlayer/VideoPlayer.jsx";
import Image from "/src/components/Image/Image.jsx";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import FileUploader from "../FirestoreUpload/FirestoreUpload";
import { Modal } from "react-responsive-modal";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "./Gallery.scss";

const Gallery = ({ gallery, showEdit }) => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  const userRef = doc(db, "users", userData.uid);
  const [open, setOpen] = useState(false);
  const [imagesToRender, setImagesToRender] = useState(gallery);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  function openModal(event) {
    onOpenModal();
  }

  function closeModal(event) {
    const newData = JSON.parse(localStorage.getItem("userData"));
    setImagesToRender(newData.gallery);
    onCloseModal();
  }

  function deleteImage(event) {
    const imgID = event.target.parentNode.id;
    const imgArray = [...imagesToRender];
    imgArray.splice(imgID, 1);
    setImagesToRender(imgArray);
    userData.gallery = imgArray;
    localStorage.setItem("userData", JSON.stringify(userData));

    async function saveData() {
      await updateDoc(userRef, userData);
    }

    saveData();
  }

  return (
    <div className="gallery">
      {imagesToRender.length > 0
        ? imagesToRender.map((img) => {
            return (
              <div
                className="gallery__image-wrapper"
                key={imagesToRender.indexOf(img)}
                id={imagesToRender.indexOf(img)}
              >
                <img src={img} className="gallery__image" />
                <img
                  src="../../src/assets/icons/trash.svg"
                  className="gallery__delete-icon"
                  onClick={deleteImage}
                />
              </div>
            );
          })
        : ""}

      {showEdit ? (
        <>
          <button className="gallery__add-btn" onClick={openModal}>
            Add Content
          </button>
          <Modal open={open} onClose={closeModal} center>
            <FileUploader></FileUploader>
          </Modal>

          {/* <button className="gallery__del-btn">Delete</button> */}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Gallery;
