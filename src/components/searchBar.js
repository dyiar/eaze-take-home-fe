import React from 'react';

export default function SearchBar (props) {

    function moveToResults() {
        let input = props.input
        props.onSubmit()
        setTimeout(() => {
          props.history.push(`/search/${input}`)
        }, 1000);
      }
    function keyDown(e){
        if (e.key==='Enter'){
            moveToResults()
        }
    }


    return (
        <>
        <input name="input" placeholder="Search for other gifs" onChange={props.onChange} onKeyPress={keyDown}></input><button onClick={moveToResults}></button>
        </>
    )
}