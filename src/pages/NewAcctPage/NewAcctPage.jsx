import React from "react";
import { Link } from "react-router-dom";
import "./NewAcctPage.scss";

const NewAcctPage = () => {
  return (
    <div>
      <main className="new-acct-page">
        <section>
          <h1>Welcome to Reveal!</h1>
          <p>Your account was successfully created. </p>
          <Link to="/profile/edit">
            <button className="new-acct-page__btn">
              Fill out your profile
            </button>
          </Link>
          <Link to="/">
            <button className="new-acct-page__btn">Return home</button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default NewAcctPage;
