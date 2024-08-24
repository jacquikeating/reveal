import { FC, useCallback, useEffect, useRef, useState } from "react";
import VideoPlayer from "/src/components/VideoPlayer/VideoPlayer.jsx";
import Image from "/src/components/Image/Image.jsx";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import FileUploader from "../FirestoreUpload/FirestoreUpload";
import { Modal } from "react-responsive-modal";
import { toast } from "react-toastify";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import "lightgallery/css/lg-thumbnail.css";
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

  function renderToast(event) {
    toast(
      <div className="confirm-delete">
        <p className="confirm-delete__text">
          Are you sure you wish to delete this image?
        </p>
        <div className="confirm-delete__button-container">
          <button className="confirm-delete__button" onClick={deleteImage}>
            Yes
          </button>
          <button className="confirm-delete__button" onClick={dismissToast}>
            No
          </button>
        </div>
      </div>,
      {
        theme: "dark",
      }
    );

    function dismissToast() {
      toast.dismiss();
    }

    function deleteImage() {
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
      dismissToast();
    }
  }

  return (
    <>
      <LightGallery speed={500} plugins={[lgThumbnail, lgZoom]}>
        {imagesToRender.length > 0
          ? imagesToRender.map((img) => {
              return (
                <div
                  data-src={img}
                  data-sub-html="<p>Test Caption</p>"
                  className="gallery__image-wrapper"
                  key={imagesToRender.indexOf(img)}
                  id={imagesToRender.indexOf(img)}
                >
                  <img src={img} className="gallery__image" />
                  {showEdit ? (
                    <img
                      src="../../src/assets/icons/trash.svg"
                      className="gallery__delete-icon"
                      onClick={renderToast}
                    />
                  ) : (
                    ""
                  )}
                </div>
              );
            })
          : ""}
      </LightGallery>
      {showEdit ? (
        <>
          <button className="gallery__add-btn" onClick={openModal}>
            Add Content
          </button>
          <Modal open={open} onClose={closeModal} center>
            <FileUploader></FileUploader>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Gallery;
