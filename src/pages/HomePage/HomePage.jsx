import "./HomePage.scss";
import { React } from "react";
import Post from "../../components/Post/Post";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";

const HomePage = () => {
  return (
    <main className="home">
      <section className="home__section">
        <h2 className="home__section-heading">This Week in City</h2>
        <EmblaCarousel />
      </section>
      <section className="home__section">
        <h2 className="home__section-heading">Hot Posts</h2>
        <Post />
      </section>
    </main>
  );
};

export default HomePage;
