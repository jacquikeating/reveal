import { React, useState } from "react";
import { Modal } from "react-responsive-modal";
import "./Hero.scss";

const Hero = ({ img, nextEvent, showEdit }) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  let imgSrc = () => {
    if (img) {
      return img;
    } else {
      return "../src/assets/image-placeholder.png"; // Placeholder image
    }
  };

  function openModal(event) {
    onOpenModal();
  }

  function closeModal(event) {
    onCloseModal();
  }

  function changeCover() {
    const userData = JSON.parse(localStorage.getItem("userData"));
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
        <p>Tiny version of user gallery goes here</p>
      </Modal>
    </div>
  );
};

export default Hero;
