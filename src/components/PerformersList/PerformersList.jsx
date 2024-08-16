import { useEffect, useState, Suspense, lazy } from "react";
import { db } from "../../config/firebase.js";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "./PerformersList.scss";

const PerformersList = ({ performerIDs }) => {
  // let performersInShow = allUsersList.filter((user) =>
  //   performerIDs.includes(user.id)
  // );
  const [performersInShow, setPerformersInShow] = useState([]);

  console.log(performerIDs);
  let performerDataArray = [];
  useEffect(() => {
    async function getPerformersData() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        let userData = doc.data();
        if (performerIDs.includes(doc.id)) {
          performerDataArray.push(userData);
        }
      });
      console.log(performerDataArray);
      setPerformersInShow(performerDataArray);
    }

    getPerformersData();
  }, []);
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
              <li className="performer" key={performer.name}>
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
