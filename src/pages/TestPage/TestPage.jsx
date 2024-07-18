import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../config/firebase.js";
import {
  getDoc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import FirestoreUpload from "../../components/FirestoreUpload/FirestoreUpload.jsx";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parse,
  addMonths,
  subMonths,
} from "date-fns";
import "./TestPage.scss";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { EventQuickView } from "../../components/EventQuickView/EventQuickView";

// const TestPage = () => {
//   return (
//     <div>
//       <main className="test-page">
//         <section>
//         </section>
//       </main>
//     </div>
//   );
// };
// export default TestPage;

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsData, setEventsData] = useState([]);
  const [eventsThisMonth, setEventsThisMonth] = useState([]);
  const [eventToShowInModal, setEventToShowInModal] = useState(null);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // console.log(currentMonth.getMonth() + 1);
  let thisMonth = "July";
  const eventsCollectionRef = collection(db, "events");

  // let filteredMonths = filterEventsByMonth();

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    // This is for the original way with Axios and MySQL
    // useEffect(() => {
    //   const fetchEventsData = async () => {
    //     try {
    //       const response = await axios.get(getEventsListEndpoint());
    //       setEventsData(response.data);
    //     } catch (error) {
    //       console.error("Error loading data:", error);
    //     }
    //   };

    //   fetchEventsData();
    // }, []);

    useEffect(() => {
      const fetchEventsData = async () => {
        try {
          const data = await getDocs(eventsCollectionRef);
          // get only essential deets
          const filteredData = [
            data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
          ];
          const eventsArr = filteredData[0];

          function filterEventsByMonth() {
            return eventsArr.filter((event) => {
              return event.month == thisMonth;
            });
          }

          setEventsThisMonth(filterEventsByMonth());
          // console.log(filterEventsByMonth());
          // const filteredByMonth = filteredData.filter((show, i) => {
          //   console.log(show[i].month);
          //   // show.month == currentMonth;
          // });

          // console.log(filteredByMonth);
          // const thisMonthOnly = filterEventsByMonth(filteredData);

          // function filterEventsByMonth() {
          //   return filteredData.filter((event) => {
          //     return event.month == currentMonth;
          //   });
          // }

          // console.log(thisMonthOnly);
          setEventsData(filteredData);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };

      fetchEventsData();
    }, []);

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  };

  const daysWithEvents = eventsThisMonth.map((show) => Number(show.day));
  // console.log(daysWithEvents);

  const dayWithEvent = (day) => {
    return daysWithEvents.includes(day);
  };

  function openModal(event) {
    const showData = eventsThisMonth.find(
      (show) => show.main_image == event.target.src
    );
    setEventToShowInModal(showData);
    onOpenModal();
  }

  const renderDays = () => {
    const dateFormat = "dddd";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            {dayWithEvent(day.getDate()) ? (
              <img
                src={
                  eventsThisMonth.find((show) => show.day == day.getDate())
                    .main_image
                }
                className="bg"
                // ref={eventsThisMonth.find((show) => show.day == day.getDate())}
                // onClick={() => openModal(ref)}
                onClick={() => openModal(event)}
              />
            ) : (
              ""
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <Modal open={open} onClose={onCloseModal} center>
        <EventQuickView event={eventToShowInModal} />
      </Modal>
    </div>
  );
};

export default Calendar;
