import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PerformersList.scss";

const PerformersList = ({ performerIDs, allUsersList }) => {
  let performersList = allUsersList.filter((user) =>
    performerIDs.includes(user.id)
  );

  return (
    <ul className="performers-list">
      {performersList.map((performer) => {
        return (
          <li className="performer" key={performer.id}>
            <Link to={`/profile/${performer.id}`} className="performer__link">
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
    </ul>
  );
};

export default PerformersList;
