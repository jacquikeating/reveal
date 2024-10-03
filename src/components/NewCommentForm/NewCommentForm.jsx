import React, { useState } from "react";
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase.js";
import "./NewCommentForm.scss";

const NewCommentForm = ({ postRef, postData }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
  });
  const form = document.getElementById("form");
  const [writeComment, setWriteComment] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.content) formErrors.content = "This field is required";
    return formErrors;
  };

  const prepareFormData = (submittedData) => {
    let preparedFormData = {
      userUID: userData.uid,
      userName: userData.name,
      userAvatar: userData.avatar,
      timestamp: new Date().getTime().toString(),
      content: submittedData.content,
      likes: [],
    };
    Reflect.deleteProperty(submittedData, "content");
    return preparedFormData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      const dataToSubmit = prepareFormData(formData);
      console.log(dataToSubmit);
      let commentsArr = postData.comments;
      console.log(commentsArr);
      commentsArr.push(dataToSubmit);
      await updateDoc(postRef, {
        comments: commentsArr,
      });
      setFormData({
        content: "",
      });
      form.reset();
      setWriteComment(false);
      setLoading(false);
    } else {
      console.error("Missing required field");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <form className="comment-form" onSubmit={handleSubmit} id="form">
      {writeComment ? (
        <>
          <div className="comment-form__top">
            <img src={userData.avatar} className="comment-form__user-avatar" />
            <textarea
              className="comment-form__content"
              name="content"
              placeholder="Start writing..."
              required
              value={formData.content}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="comment-form__check-btn">
            <img
              className="post__icon post__icon--check"
              src="../../src/assets/icons/check.svg"
            />
          </button>
        </>
      ) : (
        ""
      )}

      {/* {writeComment ? (
        <button type="submit" className="comment-form__check-btn">
          <img
            className="post__icon post__icon--check"
            src="../../src/assets/icons/check.svg"
          />
        </button>
      ) : (
        ""
      )} */}
    </form>
  );
};

export default NewCommentForm;
