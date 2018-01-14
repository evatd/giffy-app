import React, { Component } from "react";

class Gif extends Component {
  // when our video loaded add a loaded classname
  // otherwise the video stays hidden
  constructor(props) {
    super(props);
    // we control the loaded classname (how we show the videos) via the state
    this.state = {
      loaded: false
    };
  }

  render() {
    // add loaded here, otherwise undefined!
    const { loaded } = this.state;
    const { images } = this.props;
    return (
      <video
        // when we have the loaded state as true, we add a loaded class
        // so only when the video is loaded, it will have this classname loaded
        // which will apply the CSS (opacity, scale) to show the new image
        // to skip the else part, write the below as:
        // className={`grid-item video ${loaded && "loaded"}`}
        className={`grid-item video ${loaded ? "loaded" : ""}`}
        autoPlay
        loop
        // changed gif.images.original.mp4 to this.props.images.original.mp4,
        // then pulled images from the latter for cleaner code
        src={images.original.mp4}
        // pass in a function
        // onLoadedData={()=> console.log("loaded")}
        // when the data is loaded, the loaded is set to true
        onLoadedData={() => this.setState({ loaded: true })}
      />
    );
  }
}

export default Gif;
