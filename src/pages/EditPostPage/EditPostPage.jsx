import { useNavigate } from "react-router-dom";
import EditPostForm from "../../components/NewPostForm/NewPostForm";
import Toastify from "toastify-js";
import "./EditPostPage.scss";
import "toastify-js/src/toastify.css";

const EditPostPage = () => {
  let navigate = useNavigate();

  function goHome() {
    navigate("/");
  }

  return (
    <>
      <main>
        <EditPostForm />
        <button className="cancel-btn" onClick={goHome}>
          Cancel
        </button>
      </main>
    </>
  );
};

export default EditPostPage;
