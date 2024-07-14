import { useNavigate } from "react-router-dom";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import Toastify from "toastify-js";
import "./PostPage.scss";
import "toastify-js/src/toastify.css";

const PostPage = () => {
  let navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <>
      <main>
        <NewPostForm />
        <button className="cancel-btn" onClick={goHome}>
          Cancel
        </button>
      </main>
    </>
  );
};

export default PostPage;
