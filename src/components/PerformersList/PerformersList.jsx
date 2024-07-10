import React from "react";
import { Link } from "react-router-dom";
import "./PerformersList.scss";

const PerformersList = () => {
  const performersList = [
    {
      id: 1,
      name: "Velvet Vixen",
      avatar: "/src/assets/icons/avatar-placeholder.png",
    },
    {
      id: 2,
      name: "Mister Midnight",
      avatar: "/src/assets/icons/avatar-placeholder.png",
    },
    {
      id: 3,
      name: " Pearl Noir",
      avatar: "/src/assets/icons/avatar-placeholder.png",
    },
    {
      id: 4,
      name: "Duke DeLuxe",
      avatar: "/src/assets/icons/avatar-placeholder.png",
    },
    {
      id: 5,
      name: "Ivory Empress",
      avatar: "/src/assets/icons/avatar-placeholder.png",
    },
    {
      id: 6,
      name: "Jasper Jinx",
      avatar: "/src/assets/icons/avatar-placeholder.png",
    },
  ];

  return (
    <ul className="performers-list">
      {performersList.map((performer) => {
        return (
          //   <EventPreview
          //     key={performer.id}
          //     name={performer.name}
          //     avatar={performer.avatar}
          //   />

          <li className="performer" key={performer.id}>
            <Link to="/profile" className="performer__link">
              <img
                className="performer__avatar"
                src={performer.avatar}
                alt="Performer's avatar"
              />
              <p className="performer__name">{performer.name}</p>
            </Link>
          </li>
        );
      })}

      {/* <li className="performer">
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
      </li> */}
    </ul>
  );
};

export default PerformersList;
