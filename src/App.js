import React, { Component } from "react";
import Gifs from "./components/gifs";
import SearchResults from "./components/searchResults";
import SingleGif from "./components/singleGif";
import SearchBar from "./components/searchBar";
import { Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      singleGif: [],
      input: "",
      searchResults: []
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://api.giphy.com/v1/gifs/trending?api_key=JGRcVV4b5kPHiXROCVdtTliTMmYZYZzV&limit=24"
      )
      .then(response => {
        this.setState({
          gifs: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  singleGif = gif_id => {
    axios
      .get(
        `http://api.giphy.com/v1/gifs/${gif_id}?api_key=JGRcVV4b5kPHiXROCVdtTliTMmYZYZzV`
      )
      .then(response => {
        // was having a problem accessing down the object into images/original so I set it to localstorage because there are quite a few things there I need access to for the single gif.
        localStorage.setItem(
          "single",
          JSON.stringify({ original: response.data.data.images.original })
        );
        this.setState({
          singleGif: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onChange = event => {
    // creating temp variables so that state can be set to a string connected by + instead of spaces so my axios call will go through correctly.
    let preInput = event.target.value;
    let temp = preInput.split(" ");
    preInput = temp.join("+");
    this.setState({
      [event.target.name]: preInput
    });
  };

  onSubmit = () => {
    let input = this.state.input;
    axios
      .get(
        `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=JGRcVV4b5kPHiXROCVdtTliTMmYZYZzV&limit=24`
      )
      .then(response => {
        this.setState({
          searchResults: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        {/* Implementing Routes into app and passing the Route props down to Gifs so I can access history.push to get a single gif on the screen. */}

        {/* This route is made without exact so the searchbar will be viewable in all paths.  */}
        <Route
          path="/"
          render={props => (
            <SearchBar
              {...props}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              input={this.state.input}
            />
          )}
        />

        <Route
          exact
          path="/"
          render={props => (
            <Gifs
              {...props}
              singleGif={this.singleGif}
              gifs={this.state.gifs}
            />
          )}
        />

        <Route
          exact
          path="/:id"
          render={props => (
            <SingleGif
              {...props}
              singleGif={this.state.singleGif}
              singleImage={this.state.singleImage}
            />
          )}
        />

        <Route
          path="/search/:result"
          render={props => (
            <SearchResults
              {...props}
              singleGif={this.singleGif}
              searchResults={this.state.searchResults}
            />
          )}
        />

      </div>
    );
  }
}

export default App;

// to-do list:
// style site:
//    background color: black
//    font color: #b2b2b2
//    style searchbar and button
//    mobile/tablet views
//    nav links for home page and search results if not empty
//    loading placeholder
//    favorite options
//    onscroll option to load more gifs -> reached the bottom add 24 to the next call and append the results to the current state value.

