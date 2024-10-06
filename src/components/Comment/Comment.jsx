import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase.js";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import {
  updateLikes,
  handleDeleteClick,
  updatePostContent,
} from "../Post/Post.jsx";
import "./Comment.scss";

const Comment = ({ commentData, userData, parentID }) => {
  let {
    userAvatar,
    userProfileURL,
    userName,
    userUID,
    timestamp,
    content,
    likes,
  } = commentData;
  const [likesCount, setLikesCount] = useState(likes.length);
  const [isLiked, setIsLiked] = useState(likes.includes(userData.uid));
  const [postDisplay, setPostDisplay] = useState("flex");
  const [editMode, setEditMode] = useState(false);
  const [bodyText, setBodyText] = useState(content);
  const [writeComment, setWriteComment] = useState(false);
  timestamp = new Intl.DateTimeFormat("en-US").format(timestamp);
  const postRef = doc(db, "posts", parentID);

  return (
    <article className="comment" style={{ display: `${postDisplay}` }}>
      <div className="comment__line"></div>
      <Link to={`/profile/${userProfileURL}`}>
        <img
          className="post__avatar"
          alt={`${userName}'s avatar`}
          src={userAvatar}
        />
      </Link>
      <div className="post__text">
        <div className="post__name-and-time">
          <Link to={`/profile/${userProfileURL}`}>
            <p className="post__username">{userName}</p>
          </Link>
          <p className="post__timestamp">{timestamp}</p>
        </div>

        {!editMode ? (
          <p className="post__content">{bodyText}</p>
        ) : (
          <textarea
            className="post__edit-body-textarea"
            defaultValue={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
          />
        )}

        <div className="post__reactions">
          <button className="post__btn" onClick={updateLikes}>
            {isLiked ? (
              <img
                className="post__icon post__icon--likes"
                src="../../src/assets/icons/heart-solid.svg"
              />
            ) : (
              <img
                className="post__icon post__icon--likes"
                src="../../src/assets/icons/heart.svg"
              />
            )}

            <p className="post__likes">{likesCount}</p>
          </button>

          {userData.uid == userUID ? (
            <div className="post__manage">
              {!editMode ? (
                <button className="post__btn" onClick={() => setEditMode(true)}>
                  <img
                    className="post__icon post__icon--edit"
                    src="../../src/assets/icons/edit.svg"
                  />
                </button>
              ) : (
                <button className="post__btn" onClick={updatePostContent}>
                  <img
                    className="post__icon post__icon--check"
                    src="../../src/assets/icons/check.svg"
                  />
                </button>
              )}

              <button className="post__btn" onClick={handleDeleteClick}>
                <img
                  className="post__icon post__icon--delete"
                  src="../../src/assets/icons/trash.svg"
                />
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {writeComment ? (
          <NewCommentForm postRef={postRef} postData={postData} />
        ) : (
          ""
        )}
      </div>
    </article>
  );
};

export default Comment;
