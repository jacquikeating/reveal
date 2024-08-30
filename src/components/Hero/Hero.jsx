import { React, useState } from "react";
import { Modal } from "react-responsive-modal";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import "./Hero.scss";

const Hero = ({ img, nextEvent, showEdit }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  let userGallery = userData.gallery;
  const userRef = doc(db, "users", userData.uid);
  const [open, setOpen] = useState(false);
  const [coverImg, setCoverImg] = useState(userData.coverImg);
  const [selectedImg, setSelectedImg] = useState(userData.coverImg);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  let imgSrc = () => {
    if (img) {
      return img;
    } else if (coverImg) {
      return coverImg;
    } else {
      return "../src/assets/image-placeholder.png";
    }
  };

  function openModal() {
    onOpenModal();
  }

  function closeModal() {
    onCloseModal();
  }

  function selectImg(imgURL) {
    setSelectedImg(imgURL);
  }

  async function changeCover() {
    if (selectedImg !== coverImg) {
      setCoverImg(selectedImg);
      let updatedUserData = userData;
      updatedUserData.coverImg = selectedImg;
      await updateDoc(userRef, updatedUserData);
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    closeModal();
  }

  return (
    <div className="hero" style={{ "--img": `url(${imgSrc()})` }}>
      <img className="hero__img" src={imgSrc()} />
      <div className="hero__gradient-overlay"></div>
      {nextEvent ? (
        <div className="next-event">
          <h2 className="next-event__title">Next Show in Toronto:</h2>
          <p className="next-event__name">{nextEvent.name}</p>
          <p className="next-event__details">
            {nextEvent.month} {nextEvent.day} at The Painted Lady
          </p>
        </div>
      ) : (
        ""
      )}

      {showEdit ? (
        <button className="hero__edit-button" onClick={openModal}>
          Change cover image
        </button>
      ) : (
        ""
      )}

      <Modal open={open} onClose={closeModal} center>
        <p className="change-cover__instructions">
          Select a cover image from your gallery
        </p>
        <div className="change-cover__gallery-container">
          {userGallery.length > 0
            ? userGallery.map((img) => {
                return (
                  <img
                    src={img.url}
                    key={userGallery.indexOf(img)}
                    className={`change-cover__img-option ${
                      selectedImg === img.url
                        ? "change-cover__img-option--selected"
                        : ""
                    }`}
                    onClick={(e) => selectImg(img.url)}
                  />
                );
              })
            : ""}
        </div>
        <button className="change-cover__btn" onClick={changeCover}>
          Save changes
        </button>
      </Modal>
    </div>
  );
};

export default Hero;
