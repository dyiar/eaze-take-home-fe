import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function SearchResults() {
  const [gifs, setGifs] = useState({data: []});
//   const [query, setQuery] = useState();

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios.get('http://api.giphy.com/v1/gifs/trending?api_key=JGRcVV4b5kPHiXROCVdtTliTMmYZYZzV');
      if (!ignore) setGifs(result.data);
      console.log(result)
    }

    fetchData();
    console.log(gifs)
    return () => { ignore = true; }
  }, []);


  return (
    <>
      {/* <input value={query} onChange={e => setQuery(e.target.value)} /> */}
      {/* <ul> */}
          <p>Hello</p>
        {/* {gifs.data.map(item => (
          <li key={item.id}>
            <img src={item.images.fixed_height_small.url} />
          </li>
        ))}
      </ul> */}
    </>
  );
}
