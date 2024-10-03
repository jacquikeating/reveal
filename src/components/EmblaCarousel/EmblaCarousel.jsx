import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import EventPreview from "../EventPreview/EventPreview";
import "./EmblaCarousel.scss";

const EmblaCarousel = ({ eventsData }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  // useEmblaCarousel.globalOptions = { loop: true };

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
          {eventsData.map((show) => {
            return (
              <div className="embla__slide" key={show.id}>
                <EventPreview
                  id={show.id}
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
