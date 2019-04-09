import React, { Component } from "react";

//the goal of this component is to mirror giphy's website.
class SingleGif extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };
  }

  //toggle dropdown for more information about the gif
  dropDown = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }));
  };
  // click anywhere else in the div and it will close
  handleClickOutside = () => {
    if (this.state.toggle === true) {
      this.setState({
        toggle: false
      });
    }
  };

  render() {
    // this keeps the site from crashing on refresh in the singlegif component.
    if (this.props.singleGif.length < 1) {
      this.props.history.push("/");
      return <p>Go back</p>;
    }

    // this function helps me convert the sizes of the gifs from bytes to mb and return that in the size descriptor for the user to see.
    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return "0 Bytes";

      const k = 1000;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    //setting a variable for original so I can access the information set in localstorage.
    let original = JSON.parse(localStorage.getItem("single"));

    //setting variable for ID so I can compare it against the localstorage favorites.
    let id = this.props.singleGif.id;


  if (this.props.loaded === false) {
    return (
      <div className="image-container">
        <img
          className="loading-gif"
          src="https://media.giphy.com/media/TvLuZ00OIADoQ/giphy.gif"
          alt="loading"
        />
      </div>
    );
  } else {

    return (
      <div className="singleGif-container gif-container" onClick={this.handleClickOutside}>
        <div className="username-container">
          <p>Submitted by {this.props.singleGif.username.length > 0 ? (this.props.singleGif.username) : <p>No Name Provided</p>}</p>
          {this.props.singleGif.username.length > 0 ? (
            <img
              src={this.props.singleGif.user.avatar_url}
              className="avatar"
              alt="avatar img"
            />
          ) : null}
        </div>
        <div className="image-title-container">
          <div className="title-container">
            <p>{this.props.singleGif.title}</p>
            <i className="fas fa-ellipsis-h" onClick={this.dropDown} />
          </div>
          <div className="single-gif-container">
            {this.state.toggle ? (
              <div className="dropdown">
                <p>
                  Dimensions: {original.original.width} x{" "}
                  {original.original.height}
                </p>
                <p>Size: {formatBytes(original.original.size)}</p>
                <p>Frames: {original.original.frames}</p>
                <p>Upload Date: {this.props.singleGif.import_datetime}</p>
                <p>Rating: {this.props.singleGif.rating}</p>
              </div>
            ) : null}
            <img src={original.original.url} alt="gif" />
          </div>
        </div>
        <div className="single-favorite">

        {/* This checks against favorites to see if a gif has already been favorited. If it has, displays a full red heart. Else, displays a clear heart. */}
        
          {JSON.parse(localStorage.getItem("favorites")).find(function(ele) {
            return ele.id === id;
          }) ? (
            <i
              className="fas fa-heart favorited"
              onClick={() => this.props.addFavorite(this.props.singleGif)}
            />
          ) : (
            <i
              className="far fa-heart"
              onClick={() => this.props.addFavorite(this.props.singleGif)}
            />
          )}
          <p>Favorite</p>
        </div>
      </div>
    );
  }
}
}

export default SingleGif;
