import React from "react";

export default function SearchResults(props) {
  function moveToSingle(data) {
    props.singleGif(data.id);
    setTimeout(() => {
      props.history.push(`/${data.id}`);
    }, 1000);
  }
  return (
    <div className="image-container">
      {props.searchResults.map(item => (
        <img
          className="gifs"
          src={item.images.fixed_height_small.url}
          key={item.id}
          title={item.title}
          onClick={() => moveToSingle(item)}
        />
      ))}
    </div>
  );
}
