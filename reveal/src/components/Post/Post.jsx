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
      <div className="post__spacer"></div>
      <p className="post__content">
        I'm the hottest post on this site! (I'm also the only post.)
      </p>
    </article>
  );
};

export default Post;
