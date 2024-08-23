import React from "react";
import "./ConfirmDelete.scss";

const ConfirmDelete = () => {
  return (
    <div className="confirm-delete">
      <p className="confirm-delete__text">
        Are you sure you wish to delete this image?
      </p>
      <div className="confirm-delete__button-container">
        <button className="confirm-delete__button">Yes</button>
        <button className="confirm-delete__button">No</button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
