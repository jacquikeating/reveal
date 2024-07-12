import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./EmblaCarousel.scss";
import EventPreview from "../EventPreview/EventPreview";

const EmblaCarousel = ({ eventsData }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

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
      <button className="embla__prev" onClick={scrollPrev}>
        Prev
      </button>
      <button className="embla__next" onClick={scrollNext}>
        Next
      </button>
    </div>
  );
};
export default EmblaCarousel;
