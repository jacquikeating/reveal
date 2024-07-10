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
      id: 0,
      name: "A",
      date: "July 19",
      image: "/src/assets/image-placeholder.png",
    },
    {
      id: 1,
      name: "B",
      date: "July 20",
      image: "/src/assets/image-placeholder.png",
    },
    {
      id: 2,
      name: "C",
      date: "July 21",
      image: "/src/assets/image-placeholder.png",
    },
    {
      id: 3,
      name: "D",
      date: "July 22",
      image: "/src/assets/image-placeholder.png",
    },
  ];

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {eventsData.map((show) => {
            return (
              <div className="embla__slide" key={show.id}>
                <EventPreview
                  name={show.name}
                  date={show.date}
                  image={show.image}
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
