import "./ProfilePage.scss";
import EventPreview from "../../components/EventPreview/EventPreview";
import Post from "../../components/Post/Post";
import Hero from "../../components/Hero/Hero";
import Socials from "../../components/Socials/Socials";
import EmblaCarousel from "../../components/EmblaCarousel/EmblaCarousel";

const ProfilePage = () => {
  return (
    <>
      <Hero />
      <main className="profile">
        <section className="profile__section">
          <h1 className="profile__name">Display Name</h1>
          <p className="profile__bio">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis,
            explicabo iure saepe aliquid libero dolorum maxime nam eligendi
            cumque. Excepturi quia error qui beatae iusto odit expedita
            molestias at fuga?
          </p>
          <Socials />
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading">Events</h2>
          <EmblaCarousel />
        </section>

        <section className="profile__section">
          <h2 className="profile__section-heading">Gallery</h2>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
