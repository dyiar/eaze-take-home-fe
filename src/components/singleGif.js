import React, { Component } from "react";

//the goal of this component is to mirror giphy's website.
class SingleGif extends Component {
  constructor() {
    super()
  this.state = {
    toggle: false
  }
}


//toggle dropdown for more information about the gif
dropDown = () => {
  this.setState(prevState => ({
    toggle: !prevState.toggle
  }))
}

  render(){

  // this function helps me convert the sizes of the gifs from bytes to mb and return that in the size descriptor for the user to see.
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  let original = JSON.parse(localStorage.getItem("single"));

  return (
    <div className="singleGif-container">
      <div className="username-container">
        <p>Submitted by {this.props.singleGif.username}</p>
      </div>
      <div className="image-title-container">
        <div className="title-container">
          <p>{this.props.singleGif.title}</p>
          <i className="fas fa-ellipsis-h" onClick={this.dropDown} />
        </div><div className="single-gif-container">
        {this.state.toggle ? (<div className="dropdown">
            <p>
              Dimensions: {original.original.width} x {original.original.height}
            </p>
            <p>Size: {formatBytes(original.original.size)}</p>
            <p>Frames: {original.original.frames}</p>
            <p>Upload Date: {this.props.singleGif.import_datetime}</p>
            <p>Rating: {this.props.singleGif.rating}</p>
          </div>) : null }
        <img src={original.original.url} />
        </div>
      </div>
    </div>
  );
}
}

export default SingleGif

