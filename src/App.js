import React, { Component } from "react";
import Gifs from "./components/gifs";
import SearchResults from "./components/search";
import SingleGif from "./components/singleGif";
import { StateProvider } from "./components/stateManagement/stateHolder";
import { Route } from "react-router-dom";
import "./App.css";

const App = () => {
  const initialState = {
    singleGif: [],
    gifs: {}
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "addGifs":
        return {
          ...state,
          gifs: action.moreGifs
        };
      case "singleGifs":
        return {
          single: action.single
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <div className="App">
        {/* Implementing Routes into app and passing the Route props down to Gifs so I can access history.push to get a single gif on the screen. */}
        <Route exact path="/" render={props => <Gifs {...props} />} />
        <Route path="/:id" render={props => <SingleGif {...props} />} />

        {/* <SearchResults /> */}
      </div>
    </StateProvider>
  );
};

export default App;
