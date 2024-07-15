import "./SignupPage.scss";
import SignupForm from "../../components/SignupForm/SignupForm";
import FileUploader from "../../components/FileUploader/FileUploader";
import Auth from "../../components/Auth/Auth";

const SignupPage = () => {
  return (
    <main className="signup-page">
      <section className="signup-page__section">
        <h1 className="signup-page__heading">Sign Up for Reveal</h1>
        <Auth />
        {/* <SignupForm /> */}
      </section>
    </main>
  );
};

export default SignupPage;
