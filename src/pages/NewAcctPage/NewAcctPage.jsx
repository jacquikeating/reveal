import React from "react";
import { Link } from "react-router-dom";
import "./NewAcctPage.scss";

const NewAcctPage = () => {
  return (
    <main>
      <section className="new-acct-page">
        <h1>Welcome to Reveal!</h1>
        <div className="new-acct-page__container">
          {" "}
          <img
            src="/src/assets/image-placeholder.png"
            className="new-acct-img"
          />
          <div className="new-acct-page__content">
            <p>Your account was successfully created.</p>
            <p>Where would you like to go next?</p>
            <Link to="/profile/edit">
              <button className="new-acct-page__btn">Edit my profile</button>
            </Link>
            <Link to="/">
              <button className="new-acct-page__btn">Return home</button>
            </Link>
            <Link to="/events">
              <button className="new-acct-page__btn">Find events</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewAcctPage;
