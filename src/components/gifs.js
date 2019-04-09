import React from "react";

export default function Gifs(props) {
  //set a small timeout to allow page some time to finish making the call
  function moveToSingle(data) {
    props.singleGif(data.id);
    setTimeout(() => {
      props.history.push(`/${data.id}`);
    }, 1000);
  }

  if (props.loaded === false) {
    return (
      <div className="image-container">
        <img
          className="loading-gif"
          src="https://media.giphy.com/media/TvLuZ00OIADoQ/giphy.gif"
          alt="loading"
        />
      </div>
    );
  } else {
    return (
      <div className="gif-container">
        <p className="trending">Trending Gifs</p>
        <div className="image-container">
          {/* This component is what makes my gif mosiac. */}
          {props.gifs.map(item => (
            <div key={item.id} className="gifs">
              <img
                src={item.images.fixed_height_small.url}
                key={item.id}
                title={item.title}
                onClick={() => moveToSingle(item)}
                alt="gifs"
              />

              {/* This checks against favorites to see if a gif has already been favorited. If it has, displays a full red heart. Else, displays a clear heart. */}

              {JSON.parse(localStorage.getItem("favorites")).find(function(
                ele
              ) {
                return ele.id === item.id;
              }) ? (
                <i
                  className="fas fa-heart favorited"
                  onClick={() => props.addFavorite(item)}
                />
              ) : (
                <i
                  className="far fa-heart"
                  onClick={() => props.addFavorite(item)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
