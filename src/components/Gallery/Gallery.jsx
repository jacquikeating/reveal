import VideoPlayer from "/src/components/VideoPlayer/VideoPlayer.jsx";
import Image from "/src/components/Image/Image.jsx";
import "./Gallery.scss";

const Gallery = ({ gallery }) => {
  return (
    <div className="gallery">
      {gallery.map((img) => {
        return <img src={img} className="gallery__image" />;
      })}
    </div>
  );
};

export default Gallery;
