import React from "react";
import { Link } from "react-router-dom";
import "./PerformersList.scss";

const PerformersList = () => {
  return (
    <ul className="performers-list">
      <li className="performer">
        <Link to="/profile" className="performer__link">
          <img
            className="performer__avatar"
            src="/src/assets/icons/avatar-placeholder.png"
            alt="Performer's avatar"
          />
          <p className="performer__name">Performer Name</p>
        </Link>
      </li>
      <li className="performer">
        <Link to="/profile" className="performer__link">
          <img
            className="performer__avatar"
            src="/src/assets/icons/avatar-placeholder.png"
            alt="Performer's avatar"
          />
          <p className="performer__name">Performer Name</p>
        </Link>
      </li>
      <li className="performer">
        <Link to="/profile" className="performer__link">
          <img
            className="performer__avatar"
            src="/src/assets/icons/avatar-placeholder.png"
            alt="Performer's avatar"
          />
          <p className="performer__name">Performer Name</p>
        </Link>
      </li>
      <li className="performer">
        <Link to="/profile" className="performer__link">
          <img
            className="performer__avatar"
            src="/src/assets/icons/avatar-placeholder.png"
            alt="Performer's avatar"
          />
          <p className="performer__name">Performer Name</p>
        </Link>
      </li>
      <li className="performer">
        <Link to="/profile" className="performer__link">
          <img
            className="performer__avatar"
            src="/src/assets/icons/avatar-placeholder.png"
            alt="Performer's avatar"
          />
          <p className="performer__name">Performer Name</p>
        </Link>
      </li>
      <li className="performer">
        <Link to="/profile" className="performer__link">
          <img
            className="performer__avatar"
            src="/src/assets/icons/avatar-placeholder.png"
            alt="Performer's avatar"
          />
          <p className="performer__name">Performer Name</p>
        </Link>
      </li>
    </ul>
  );
};

export default PerformersList;
