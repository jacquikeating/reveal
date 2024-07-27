import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <main>
      <section>
        <h1>Log In</h1>
        <LoginForm />
        <Link to="/signup">
          Don't have an account yet?<span>Sign up</span>
        </Link>
      </section>
    </main>
  );
};

export default LoginPage;
