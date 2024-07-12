import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./EmblaCarousel.scss";
import EventPreview from "../EventPreview/EventPreview";

const EmblaCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // TEMPORARY TEST DATA
  const eventsData = [
    {
      id: 1,
      name: "A",
      month: "July",
      day: "20",
      main_image: "/src/assets/image-placeholder.png",
    },
    {
      id: 2,
      name: "B",
      month: "July",
      day: "20",
      main_image: "/src/assets/image-placeholder.png",
    },
    {
      id: 3,
      name: "C",
      month: "July",
      day: "20",
      main_image: "/src/assets/image-placeholder.png",
    },
    {
      id: 4,
      name: "D",
      month: "July",
      day: "20",
      main_image: "/src/assets/image-placeholder.png",
    },
  ];

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {eventsData.map((show) => {
            return (
              <div className="embla__slide">
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
