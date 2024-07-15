import "./LoginPage.scss";
import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
const LoginPage = () => {
  return (
    <main>
      <section>
        <h1>Log In</h1>
        <LoginForm />
      </section>
    </main>
  );
};

export default LoginPage;
