import React, { Component } from "react";
import Gifs from "./components/gifs";
import SearchResults from "./components/search";
import SingleGif from "./components/singleGif";
import { Route } from "react-router-dom";
import axios from 'axios';
import "./App.css";

class App extends Component {
  constructor() {
    super()
  this.state = {
    gifs: [],
    singleGif: [],
    toggle: 'false'
  }
}

  componentDidMount() {
    axios
    .get("http://api.giphy.com/v1/gifs/trending?api_key=JGRcVV4b5kPHiXROCVdtTliTMmYZYZzV&limit=24")
    .then(response => {
      this.setState({
        gifs: response.data.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  singleGif = (gif_id) => {
    axios
    .get(`http://api.giphy.com/v1/gifs/${gif_id}?api_key=JGRcVV4b5kPHiXROCVdtTliTMmYZYZzV`)
    .then(response => {
      // was having a problem accessing down the object into images/original so I set it to localstorage because there are quite a few things there I need access to for the single gif.
      localStorage.setItem('single', JSON.stringify({original: response.data.data.images.original}))
      this.setState({
        singleGif: response.data.data,
      })
    })
    .catch(err => {
      console.log(err)})
  }

  render() {
  return (
      <div className="App">
        {/* Implementing Routes into app and passing the Route props down to Gifs so I can access history.push to get a single gif on the screen. */}
        <Route exact path="/" render={props => <Gifs {...props} singleGif={this.singleGif} gifs={this.state.gifs}/>} />

        <Route path="/:id" render={props => <SingleGif {...props} singleGif={this.state.singleGif} singleImage={this.state.singleImage} toggle={this.state.toggle}  />} />

        {/* <SearchResults /> */}
      </div>
  );
};
}

export default App;
