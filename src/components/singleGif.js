import React, {useState, useEffect} from 'react';
import axios from 'axios'

// the idea behind this functional component was to use react hooks to get the single gif. It sorta works but I still don't know enough about react hooks to be able to implement this right now.

export default function SingleGif(props) {
    const [single, setSingle] = useState([]);
    useEffect(() => {
        let ignore = false;
    
        async function fetchData() {
            let gif_id = props.match.params.id
          const result = await axios.get(
            `http://api.giphy.com/v1/gifs/${gif_id}?api_key=JGRcVV4b5kPHiXROCVdtTliTMmYZYZzV`
          );
          if (!ignore) setSingle(result.data.data);
    
    
          console.log(result.data.data);
          console.log(single)
        }
    
        fetchData();
        return () => {
          ignore = true;
        };
      }, []);

    return (
        <>
        {/* <img src={single.images.fixed_height_small.url} /> */}
        {/* {single.data.map(item => (
          <img className="gifs" src={item.images.fixed_height_small.url} key={item.id} title={item.title}/>
      ))} */}
        <p>Hello</p>
        </>
    )
}