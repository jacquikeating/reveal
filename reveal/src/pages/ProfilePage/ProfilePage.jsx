import "./ProfilePage.scss";
import EventPreview from "../../components/EventPreview/EventPreview";
import Post from "../../components/Post/Post";
import Hero from "../../components/Hero/Hero";
import Socials from "../../components/Socials/Socials";

const ProfilePage = () => {
  return (
    <>
      <Hero />
      <main className="profile">
        <h1 className="profile__name">Display Name</h1>
        <p className="profile__bio">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis,
          explicabo iure saepe aliquid libero dolorum maxime nam eligendi
          cumque. Excepturi quia error qui beatae iusto odit expedita molestias
          at fuga?
        </p>
        <Socials />
      </main>
    </>
  );
};

export default ProfilePage;
