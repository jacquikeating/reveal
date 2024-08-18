import { useState } from "react";
import VideoPlayer from "/src/components/VideoPlayer/VideoPlayer.jsx";
import Image from "/src/components/Image/Image.jsx";
import FileUploader from "../FirestoreUpload/FirestoreUpload";
import { Modal } from "react-responsive-modal";

import "./Gallery.scss";

const Gallery = ({ gallery, showEdit }) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  function openModal(event) {
    onOpenModal();
  }

  return (
    <div className="gallery">
      {gallery.length > 0
        ? gallery.map((img) => {
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
          <Modal open={open} onClose={onCloseModal} center>
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
