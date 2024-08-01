import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <main className="login-page">
      <section>
        <h1>Log In</h1>
        <LoginForm />
        <div className="login-page__signup-link">
          <Link to="/signup">
            Don't have an account yet?<span>Sign up</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
