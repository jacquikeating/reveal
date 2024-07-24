import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../../components/SignupForm/SignupForm";
import Auth from "../../components/Auth/Auth";
import "./SignupPage.scss";

const SignupPage = () => {
  const [showForm, setShowForm] = useState(false);
  let navigate = useNavigate();

  function toggleSignupForm() {
    showForm ? setShowForm(false) : setShowForm(true);
  }

  function goHome() {
    navigate("/");
  }

  return (
    <main className="signup-page">
      <section className="signup-page__section">
        <h1 className="signup-page__heading">Sign Up for Reveal</h1>
        <p className="signup-page__instruction">Set up your account with...</p>
        <Auth />
        <button className="signup-page__btn" onClick={toggleSignupForm}>
          <img
            src="/src/assets/icons/email.svg"
            alt="Envelope"
            className="signup-page__icon"
          />
          Email
        </button>
        {showForm ? <SignupForm /> : ""}
        <button className="signup-page__cancel-btn" onClick={goHome}>
          Cancel
        </button>
      </section>
    </main>
  );
};

export default SignupPage;
