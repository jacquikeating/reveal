import React from "react";
import "./Post.scss";

const Post = () => {
  return (
    <article className="post">
      <img
        src="../src/assets/icons/avatar-placeholder.png"
        className="post__avatar"
      />
      <p className="post__username">Display Name</p>
      <p className="post__timestamp">Jan 1 2025</p>
      <div className="post__spacer"></div>
      <p className="post__content">
        I'm the hottest post on this site! (I'm also the only post.)
      </p>
      <div className="post__spacer"></div>
      <div className="post__reactions">
        <img
          className="post__icon post__icon--likes"
          src="../src/assets/icons/heart.svg"
        />
        <p className="post__likes">0</p>
        <img
          className="post__icon post__icon--comments"
          src="../src/assets/icons/comment.svg"
        />
        <p className="post__comments">0</p>
      </div>
    </article>
  );
};

export default Post;
