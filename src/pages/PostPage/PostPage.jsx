import NewPostForm from "../../components/NewPostForm/NewPostForm";
import "./PostPage.scss";

const PostPage = () => {
  return (
    <>
      <main>
        <NewPostForm />
        <button className="cancel-btn">Cancel</button>
      </main>
    </>
  );
};

export default PostPage;
