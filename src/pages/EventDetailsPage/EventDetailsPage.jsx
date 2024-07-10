import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import Hero from "../../components/Hero/Hero";
import DateCircle from "../../components/DateCircle/DateCircle";
import PerformersList from "../../components/PerformersList/PerformersList";
import "./EventDetailsPage.scss";

const EventDetailsPage = () => {
  return (
    <>
      <Hero />
      <main className="event">
        <section className="event__section">
          <h1 className="event__name">Event Name</h1>
          <DateCircle month="JUN" day="25" />
          <p className="event__description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis,
            explicabo iure saepe aliquid libero dolorum maxime nam eligendi
            cumque. Excepturi quia error qui beatae iusto odit expedita
            molestias at fuga?
          </p>
        </section>

        <section className="event__section">
          <h2 className="event__section-heading">Featuring...</h2>
          <PerformersList />
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
