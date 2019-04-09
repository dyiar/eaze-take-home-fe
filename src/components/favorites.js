import React from "react";

export default function Favorites(props) {
  function moveToSingle(data) {
    props.singleGif(data.id);
    setTimeout(() => {
      props.history.push(`/${data.id}`);
    }, 1000);
  }

  if (props.favorites.length < 1) {
    props.history.push("/");
    return <p>Go back</p>;
  }

  return (
    <div className="gif-container">
      <p className="trending">Your Favorited Gifs</p>
      <div className="image-container">
        {/* This component is what makes my gif mosiac. */}
        {props.favorites.map(item => (
          <div key={item.id} className="gifs">
            <img
              src={item.images.fixed_height_small.url}
              key={item.id}
              title={item.title}
              onClick={() => moveToSingle(item)}
              alt="gifs"
            />
            <i
              className="fas fa-heart favorited"
              onClick={() => props.removeFavorite(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
