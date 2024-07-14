import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getSinglePostEndpoint } from "../../utils/api-utils";
const Post = lazy(() => import("../../components/Post/Post"));
import "./PostPage.scss";

const PostPage = () => {
  const { postID } = useParams();
  const [postData, setPostData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(getSinglePostEndpoint(postID));
        setPostData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postID]);

  return (
    <main>
      <section>
        <Suspense fallback={<p>Loading...</p>}>
          <Post postData={postData} />
        </Suspense>
      </section>
    </main>
  );
};

export default PostPage;
