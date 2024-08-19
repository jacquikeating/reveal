import { useState } from "react";
import VideoPlayer from "/src/components/VideoPlayer/VideoPlayer.jsx";
import Image from "/src/components/Image/Image.jsx";
import FileUploader from "../FirestoreUpload/FirestoreUpload";
import { Modal } from "react-responsive-modal";

import "./Gallery.scss";

const Gallery = ({ gallery, showEdit }) => {
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

  return (
    <div className="gallery">
      {imagesToRender.length > 0
        ? imagesToRender.map((img) => {
            return (
              <img
                src={img}
                className="gallery__image"
                key={gallery.indexOf(img)}
              />
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
