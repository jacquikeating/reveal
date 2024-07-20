import React from "react";
import { Link } from "react-router-dom";
import "./PerformersList.scss";

const PerformersList = ({ performerIDs, allUsersList }) => {
  let performersInShow = allUsersList.filter((user) =>
    performerIDs.includes(user.id)
  );

  return (
    <ul className="performers-list">
      {
        // If the organizer has not yet provided their list of performers, display a fallback message
        performersInShow.length === 0 ? (
          <p className="perfomers-list__fallback">
            Lineup to be announced. Check back soon!
          </p>
        ) : (
          performersInShow.map((performer) => {
            return (
              <li className="performer" key={performer.id}>
                <Link
                  to={`/profile/${performer.id}`}
                  className="performer__link"
                >
                  <img
                    className="performer__avatar"
                    src={performer.avatar}
                    alt="Performer's avatar"
                  />
                  <p className="performer__name">{performer.name}</p>
                </Link>
              </li>
            );
          })
        )
      }
    </ul>
  );
};

export default PerformersList;
