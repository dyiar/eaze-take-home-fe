import React from "react";

export default function Gifs(props) {

  function moveToSingle(data) {
    props.singleGif(data.id)
    setTimeout(() => {
      props.history.push(`/${data.id}`)
    }, 1000);
  }

  return (
    <div className="image-container">
      {/* This component is what makes my gif mosiac. */}

      {props.gifs.map(item => (
          <img className="gifs" src={item.images.fixed_height_small.url} key={item.id} title={item.title} onClick={()=>moveToSingle(item)}/>
      ))}

      hello
    </div>
  );
}
