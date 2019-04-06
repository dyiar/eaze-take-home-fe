import React, { useState, useEffect } from "react";
import Gallery from "react-photo-gallery";
import { useStateValue } from './stateManagement/stateHolder';
import axios from "axios";

export default function Gifs(props) {
  // using react hooks to use and set state.
  const [images, setGifs] = useState({ data: [] });
  const [single, setSingle] = useState([]);
  const [{gifs}, dispatch] = useStateValue();

  // Using react hooks to get data from giphy's api
  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios.get(
        "http://api.giphy.com/v1/gifs/trending?api_key=JGRcVV4b5kPHiXROCVdtTliTMmYZYZzV&limit=24"
      );
      if (!ignore) setGifs(result.data);
      if (!ignore) dispatch({type:'addGifs',
    gifs: {gifs: result.data}})

    console.log(gifs)

      console.log(result);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  // This sets an empty array which I fill with photo objects to put into the Gallery component.
  // May not use this because couldn't get onClick to work.
  // let photoArray = [];
  // for (let i = 0; i < gifs.data.length - 1; i++) {
  //   photoArray.push({
  //     src: `${gifs.data[i].images.fixed_height_small.url}`,
  //     width: parseInt(`${gifs.data[i].images.fixed_height_small.width}`),
  //     height: parseInt(`${gifs.data[i].images.fixed_height_small.height}`),
  //     key: `${gifs.data[i].id}`,
  //     single: function() {
  //       props.history.push(`/${gifs.data.id}`);
  //     }
  //   });
  // }

  function moveToSingle(data) {
    setSingle({
      src: data.images.fixed_height_small.url,
      title: data.title,
      id: data.id
    })
    console.log(single)
    console.log(data)
    props.history.push(`/${data.id}`)
  }

  return (
    <div className="image-container">
      {/* This component is what makes my gif mosiac. */}

      {images.data.map(item => (
          <img className="gifs" src={item.images.fixed_height_small.url} key={item.id} title={item.title} onClick={() => moveToSingle(item)}/>
      ))}
      {/* <Gallery photos={photoArray} columns={4} onClick={() => moveToSingle(photoArray.key)} /> */}
    </div>
  );
}
