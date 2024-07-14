import { useNavigate } from "react-router-dom";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import "./NewPostPage.scss";
import "toastify-js/src/toastify.css";

const NewPostPage = () => {
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

export default NewPostPage;
