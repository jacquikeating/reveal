import { auth, googleProvider, fbProvider } from "../../config/firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  console.log(auth);
  const navigate = useNavigate();

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/welcome");
    } catch (error) {
      console.error(error);
    }
  };

  const signUpWithFacebook = async () => {
    try {
      await signInWithPopup(auth, fbProvider).then((result) => {
        const user = result.user;
        const credential = fbProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        navigate("/welcome");
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const credential = fbProvider.credentialFromError(error);
    }
  };

  return (
    <>
      <button
        className="signup-page__btn signup-page__btn--google"
        onClick={signUpWithGoogle}
      >
        <img
          src="/src/assets/icons/google.svg"
          alt="Google logo"
          className="signup-page__icon"
        />
        Google
      </button>

      <button
        className="signup-page__btn signup-page__btn--fb"
        onClick={signUpWithFacebook}
      >
        <img
          src="/src/assets/icons/social-fb.svg"
          alt="Facebook logo"
          className="signup-page__icon"
        />
        Facebook
      </button>
    </>
  );
};

export default Auth;
