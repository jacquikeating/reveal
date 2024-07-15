import React from "react";
import "./EditSocials.scss";

const EditSocials = () => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function deleteRow(e) {
    console.log(`Deleting ${e.target.parentElement}`);
    e.target.parentElement.style = { display: "none" };
  }

  return (
    <div className="edit-socials">
      {/* <fieldset name="edit-socials"> */}
      <div className="edit-socials__option">
        <img
          className="edit-socials__icon edit-socials__icon-fb"
          src="../../src/assets/icons/social-fb.svg"
        />
        <input
          type="text"
          name="facebook"
          onChange={handleChange}
          className="edit-socials__field"
        />
        <img
          className="edit-socials__icon"
          src="../../src/assets/icons/trash.svg"
          onClick={deleteRow}
        />
      </div>

      <div className="edit-socials__option">
        <img
          className="edit-socials__icon edit-socials__icon-insta"
          src="../../src/assets/icons/social-insta.svg"
        />
        <input
          type="text"
          name="instagram"
          onChange={handleChange}
          className="edit-socials__field"
        />
        <img
          className="edit-socials__icon"
          src="../../src/assets/icons/trash.svg"
          onClick={deleteRow}
        />
      </div>

      <div className="edit-socials__option">
        <img
          className="edit-socials__icon edit-socials__icon-twitter"
          src="../../src/assets/icons/social-twitter.svg"
        />
        <input
          type="text"
          name="twitter"
          onChange={handleChange}
          className="edit-socials__field"
        />
        <img
          className="edit-socials__icon"
          src="../../src/assets/icons/trash.svg"
          onClick={deleteRow}
        />
      </div>

      <div className="edit-socials__option">
        <img
          className="edit-socials__icon edit-socials__icon-tiktok"
          src="../../src/assets/icons/social-tiktok.svg"
        />
        <input
          type="text"
          name="tiktok"
          onChange={handleChange}
          className="edit-socials__field"
        />
        <img
          className="edit-socials__icon"
          src="../../src/assets/icons/trash.svg"
          onClick={deleteRow}
        />
      </div>
      {/* </fieldset> */}
    </div>
  );
};

export default EditSocials;
