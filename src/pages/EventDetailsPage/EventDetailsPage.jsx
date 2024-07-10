import "./EventDetailsPage.scss";
import Post from "../../components/Post/Post";
import Hero from "../../components/Hero/Hero";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";

const EventDetailsPage = () => {
  return (
    <>
      <Hero />
      <main className="event">
        <section className="event__section">
          <h1 className="event__name">Event Name</h1>
          <p className="event__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis,
            explicabo iure saepe aliquid libero dolorum maxime nam eligendi
            cumque. Excepturi quia error qui beatae iusto odit expedita
            molestias at fuga?
          </p>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Featuring...</h2>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Gallery</h2>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Posts</h2>
        </section>
      </main>
    </>
  );
};

export default EventDetailsPage;
