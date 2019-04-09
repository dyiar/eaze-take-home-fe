import React, { Component } from "react";
import Gifs from "./components/gifs";
import SearchResults from "./components/searchResults";
import SingleGif from "./components/singleGif";
import SearchBar from "./components/searchBar";
import Favorites from './components/favorites';
import { Route, NavLink } from "react-router-dom";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      singleGif: [],
      input: "",
      searchResults: [],
      loaded: false,
      favorites: []
    };
  }

  componentDidMount() {
    let favorites;
    if (localStorage.getItem("favorites")) {
      favorites = JSON.parse(localStorage.getItem("favorites"));
    } else {
      favorites = [];
    }
    axios
      .get(
        "http://api.giphy.com/v1/gifs/trending?api_key=JGRcVV4b5kPHiXROCVdtTliTMmYZYZzV&limit=24"
      )
      .then(response => {
        this.setState({
          gifs: response.data.data,
          loaded: true,
          favorites: favorites
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
          singleGif: response.data.data,
          loaded: true
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
          searchResults: response.data.data,
          loaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  addFavorite = item => {
    let result = [...this.state.favorites, item]
    this.setState({
      favorites: result
    });
    localStorage.setItem("favorites", JSON.stringify(result));
  };

  removeFavorite = value => {
    let result = this.state.favorites.filter(function(ele) {
      return ele !== value;
    });
    this.setState({
      favorites: result
    });
    localStorage.setItem("favorites", JSON.stringify(result));
  };

  render() {
    return (
      <div className="App">
        {/* Implementing Routes into app and passing the Route props down to Gifs so I can access history.push to get a single gif on the screen. */}

        {/* This route is made without exact so the searchbar will be viewable in all paths.  */}
        <div className="navigation">
          <NavLink to="/" className="home-link">
            Home
          </NavLink>
          {this.state.searchResults.length > 0 ? (
            <NavLink to="/search/:result">Search Results</NavLink>
          ) : (
            <NavLink to="/">Search Results</NavLink>
          )}{" "}
          {this.state.favorites.length > 0 ? (
            <NavLink to="/favorites/list" className="favorites">
              Favorites
            </NavLink>
          ) : null}
        </div>

        <Route
          path="/"
          render={props => (
            <SearchBar
              {...props}
              onChange={this.onChange}
              onSubmit={this.onSubmit}
              input={this.state.input}
              loaded={this.state.loaded}
            />
          )}
        />

        <Route
          exact
          path="/favorites/list"
          render={props => (
            <Favorites
              {...props}
              singleGif={this.singleGif}
              favorites={this.state.favorites}
              loaded={this.state.loaded}
              removeFavorite={this.removeFavorite}
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
              loaded={this.state.loaded}
              addFavorite={this.addFavorite}
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
              addFavorite={this.addFavorite}
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
              addFavorite={this.addFavorite}
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
//    mobile/tablet views
//    onscroll option to load more gifs -> reached the bottom add 24 to the next call and append the results to the current state value.
