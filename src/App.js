import React, { Component } from "react";
import Gifs from "./components/gifs";
import SearchResults from "./components/search";
import SingleGif from "./components/singleGif";
import { Route } from "react-router-dom";
import "./App.css";

const App = () => {


  return (
      <div className="App">
        {/* Implementing Routes into app and passing the Route props down to Gifs so I can access history.push to get a single gif on the screen. */}
        <Route exact path="/" render={props => <Gifs {...props} />} />
        <Route path="/:id" render={props => <SingleGif {...props} />} />

        {/* <SearchResults /> */}
      </div>
  );
};

export default App;
