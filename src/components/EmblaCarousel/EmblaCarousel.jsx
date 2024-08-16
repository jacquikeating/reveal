import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  collection,
  query,
  where,
  getDocs,
  QueryOrderByConstraint,
} from "firebase/firestore";
import { db } from "../../config/firebase.js";
import "./EmblaCarousel.scss";
import EventPreview from "../EventPreview/EventPreview";

const EmblaCarousel = ({ eventIDs }) => {
  // useEmblaCarousel.globalOptions = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [filteredEventsData, setFilteredEventsData] = useState([]);
  console.log(eventIDs);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const relevantEvents = [];
        // Code from Firebase documentation
        const querySnapshot = await getDocs(collection(db, "events"));
        if (eventIDs.length == 0) {
          for (let i = 0; i < 5; i++) {
            let eventData = querySnapshot.docs[i].data();
            relevantEvents.push(eventData);
          }
        }
        querySnapshot.forEach((doc) => {
          if (eventIDs.includes(doc.id)) {
            let eventData = doc.data();
            eventData.uid = doc.id;
            relevantEvents.push(eventData);
          }
        });
        relevantEvents.sort((a, b) => a.day - b.day);
        setFilteredEventsData(relevantEvents);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchEventsData();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {filteredEventsData.map((show) => {
            return (
              <div className="embla__slide" key={show.uid}>
                <EventPreview
                  id={show.uid}
                  name={show.name}
                  date={`${show.month} ${show.day}`}
                  image={show.main_image}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="embla__nav-btns">
        <button className="embla__prev" onClick={scrollPrev}>
          <img
            src="/src/assets/icons/arrow-left.svg"
            alt="Arrow pointing left"
            className="embla__nav-arrow"
          />{" "}
          <p className="embla__arrow-label">Prev</p>
        </button>
        <button className="embla__next" onClick={scrollNext}>
          <p className="embla__arrow-label">Next</p>
          <img
            src="/src/assets/icons/arrow-right.svg"
            alt="Arrow pointing right"
            className="embla__nav-arrow"
            onClick={scrollNext}
          />
        </button>
      </div>
    </div>
  );
};
export default EmblaCarousel;
