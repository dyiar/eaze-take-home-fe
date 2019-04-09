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

    if (props.loaded === false) {
        return (
        <div className="image-container">
        <img className="loading-gif" src="https://media.giphy.com/media/TvLuZ00OIADoQ/giphy.gif" alt="loading" />
        </div>
        )
      }


    return (
        <div className="searchbar-container">
        <input className="searchbar" name="input" placeholder="Search for other gifs" onChange={props.onChange} onKeyPress={keyDown}></input><button className="searchbar-button" onClick={moveToResults}><i className="fas fa-search"></i></button>
        </div>
    )
}