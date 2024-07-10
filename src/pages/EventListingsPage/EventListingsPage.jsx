import "./EventListingsPage.scss";
import EventPreview from "../../components/EventPreview/EventPreview";

const EventListingsPage = () => {
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
    <main>
      <section>
        <h1>Upcoming Events in City</h1>
        {eventsData.map((show) => {
          return (
            <EventPreview
              key={show.id}
              name={show.name}
              date={show.date}
              image={show.image}
            />
          );
        })}
      </section>
    </main>
  );
};

export default EventListingsPage;
