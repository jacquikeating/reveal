import VideoPlayer from "/src/components/VideoPlayer/VideoPlayer.jsx";
import Image from "/src/components/Image/Image.jsx";
import "./Gallery.scss";

const Gallery = ({ gallery, showEdit }) => {
  return (
    <div className="gallery">
      {gallery.map((img) => {
        return (
          <img
            src={img}
            className="gallery__image"
            key={gallery.indexOf(img)}
          />
        );
      })}

      {showEdit ? (
        <>
          <button className="gallery__add-btn">Add Content</button>
          {/* <button className="gallery__del-btn">Delete</button> */}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Gallery;
