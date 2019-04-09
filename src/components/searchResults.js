import React from "react";

export default function SearchResults(props) {
  function moveToSingle(data) {
    props.singleGif(data.id);
    setTimeout(() => {
      props.history.push(`/${data.id}`);
    }, 1000);
  }
  
  if (props.searchResults.length < 1) {
    props.history.push("/");
    return <p>Go back</p>;
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
        <p className="trending">Search Results</p>
        <div className="image-container">
          {props.searchResults.map(item => (
            <div className="gifs" key={item.id}>
              <img
                src={item.images.fixed_height_small.url}
                key={item.id}
                title={item.title}
                onClick={() => moveToSingle(item)}
                alt="searched-gifs"
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
