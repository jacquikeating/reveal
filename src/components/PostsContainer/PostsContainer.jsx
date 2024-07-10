import React from "react";
import "./PostsContainer.scss";
import Post from "../../components/Post/Post";

const PostsContainer = () => {
  const postsData = [
    {
      id: 1,
      username: "Scarlet Siren",
      avatar: "../src/assets/icons/avatar-placeholder.png",
      timestamp: new Date().toLocaleDateString("en-US"),
      content:
        "I'm the hottest post on this site! (Mostly because I'm the first post.)",
      likes: 0,
      comments: [],
    },
    {
      id: 2,
      username: "Test User",
      avatar: "../src/assets/icons/avatar-placeholder.png",
      timestamp: new Date().toLocaleDateString("en-US"),
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni eos inventore natus corrupti.",
      likes: 0,
      comments: [],
    },
  ];

  return (
    <ul className="posts-container">
      {postsData.map((post) => {
        return (
          <li className="post" key={post.id}>
            <Post postData={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostsContainer;
