import "./HomePage.scss";
import EventPreview from "../../components/EventPreview/EventPreview";
import Post from "../../components/Post/Post";

const HomePage = () => {
  return (
    <main className="home">
      <section className="home__section">
        <h2 className="home__section-heading">This Week in City</h2>
        <EventPreview />
      </section>
      <section className="home__section">
        <h2 className="home__section-heading">Hot Posts</h2>
        <Post />
      </section>
    </main>
  );
};

export default HomePage;
