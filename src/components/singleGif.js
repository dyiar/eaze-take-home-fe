import React, {useState} from 'react';

export default function SingleGif() {
    const [single, setSingle] = useState([]);
    const [gifs, setGifs] = useState()

    return (
        <>
        <img src={single.src} />
        </>
    )
}