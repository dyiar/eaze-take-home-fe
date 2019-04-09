import React from "react";

export default function SearchResults(props) {
  function moveToSingle(data) {
    props.singleGif(data.id);
    setTimeout(() => {
      props.history.push(`/${data.id}`);
    }, 1000);
  }
  return (
    <div>
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
        <i className="far fa-heart" onClick={() => props.addFavorite(item)}></i>
        </div>
      ))}
    </div>
    </div>
  );
}
