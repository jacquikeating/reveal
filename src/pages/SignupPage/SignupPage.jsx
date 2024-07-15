import "./SignupPage.scss";
import SignupForm from "../../components/SignupForm/SignupForm";

const SignupPage = () => {
  return (
    <main className="signup-page">
      <section className="signup-page__section">
        <h1 className="signup-page__heading">Sign Up for Reveal</h1>
        <SignupForm />
      </section>
    </main>
  );
};

export default SignupPage;
