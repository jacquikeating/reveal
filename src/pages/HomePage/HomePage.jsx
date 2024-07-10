import "./HomePage.scss";
import { React } from "react";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
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
        <PostsContainer />
      </section>
    </main>
  );
};

export default HomePage;
