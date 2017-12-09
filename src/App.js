import React, { Component } from "react";
import loader from "./images/loader.svg";

// the flow of the state: every time we update the input,
// it's running the handleChange event,
// setting the state with our search term via setState, cheking if < or > 2 characters
// then our hintText is passed down to our UserHint component in render
// then, it's picked up in the properties inside the actual UserHint component and rendered: the state
const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

const UserHint = ({ loading, hintText }) => (
  <div className="user-hint">
    {/* here we check if we have a loading state
  and render out either out spinner or hinText based on that,
  using a tenary operator (if/else)*/}
    {loading ? (
      <img className="block mx-auto" alt="loader" src={loader} />
    ) : (
      hintText
    )}
  </div>
);

// class component = we have to use a this keyword in the event
// every time our input changes, we're going to run a function called handle change
// then add the handlechange method into our constructor
class App extends Component {
  // we use an arrow function for handleChange instead of the below, due to ES6 in create-react-app
  // constructor(props) {
  //   super(props)
  //   this.handleChange = this.handleChange.bind(this)
  // }

  // our default values are stored in our state, this.state
  // because it's stored in our state, we have to pass it to our component
  // below, in render, via a spread
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      hintText: "",
      gif: null
    };
  }

  // want a function that searches the API using async function (async + argument =>{}})
  // and puts the search term query into url
  // do sth with the results

  // we can write async methods into our comppnents
  // that let us use the async/await style of function
  searchGiffy = async searchTerm => {
    // first we try out fetch
    try {
      // we use await keyword as this is an asynchronous call, wait for our response
      // when we embed your search term, change the "" to ``
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=kCeGJXK0Yf7kz14vm8s4UbtLQZkY5c5r&q=${
          searchTerm
        }&limit=100&offset=0&rating=PG&lang=en`
      );

      // here get data and we convert our raw response into json data
      // ansd grab the data from the response,
      // and we have data inside of it,
      // so we grab our first key inside data that's called data via {}
      const { data } = await response.json();

      // we are going to return the previous state, don't want to overwrite it
      this.setState((prevState, props) => ({
        // get our old props and spread them out there
        ...prevState,
        // and overwrite the git, setting the gif
        // to be the first image from that array of results (called data)
        gif: data[0]
      }));

      console.log(data);

      // if our fetch fails, we catch it down here
    } catch (error) {}
  };

  // handleChange: every time the input changes, it's going to give us an event with a snapshot of what happened
  // the value of event.target.value is what's in the input
  handleChange = event => {
    // const value = event.target.value
    const { value } = event.target;
    this.setState((prevState, props) => ({
      // we take our old props, spread them out here
      ...prevState,
      //then we overwrite the ones we want with value of our input
      // every time the user is typing, it updates the setState
      // = controlled input, controlling our input everytime it changes via setState
      searchTerm: value,
      // we set the hint text only when we have more thna 2 characters
      // in our input, otherwise we can set it as an empty string
      // inside of our state
      hintText: value.length > 2 ? `Hit enter to search ${value}` : " "
    }));
  };

  // when we have 2 or more characters in our search box
  // and have also pressed enter, we want to run a search = the key we pressed
  // grab the info about the key we've pressed
  handleKeyPress = event => {
    const { value } = event.target;
    if (value.length > 2 && event.key === "Enter") {
      // here we call our async function using the search term (via value)
      this.searchGiffy(value);
    }
  };

  render() {
    // pull off search term from this.state
    // create a searchTerm / gif variable off our state and can thus skip tis.state.gif... below
    const { searchTerm, gif } = this.state;
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* our stack of videos mp4 which we make behave like gifs via loop: mp4 due to better performance */}
          {/* only going to render our video when we have a gif in the state, 
          inspired by an error: nothing loads because we don't have images on our null (default)
          and gif is defaulted as null / empty value*/}
        {gif && <video
            className="grid-tem video"
            autoPlay
            loop
            src={gif.images.original.mp4}
          />}
          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>
        {/* grabbing a state and passing it onto our component using a spread */}
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
