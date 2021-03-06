import React, { Component } from "react";
import Gif from "./Gif";
import Header from "./Header";
import UserHint from "./UserHint";

// we control changes and user hints in the state

// get a random image every time
const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

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
      loading: false,
      hintText: "",
      // we have an array of gifs, stacking on top of each other
      gifs: []
    };
  }

  // want a function that searches the API using async function (async + argument =>{}})
  // and puts the search term query into url
  // do sth with the results

  // we can write async methods into our comppnents
  // that let us use the async/await style of function
  searchGiffy = async searchTerm => {
    // before any fetching happens, the loading spinner is set to true
    this.setState({
      loading: true
    });
    // first we try our fetch
    try {
      // we use await keyword as this is an asynchronous call, wait for our response
      // when we embed your search term, change the "" to ``
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=kCeGJXK0Yf7kz14vm8s4UbtLQZkY5c5r&q=${searchTerm}&limit=100&offset=0&rating=PG&lang=en`
      );

      // here get data and we convert our raw response into json data
      // ansd grab the data from the response,
      // and we have data inside of it,
      // so we grab our first key inside data that's called data via {}
      const { data } = await response.json();

      // here we check if the array of results is empty,
      // i.e. no results for a search term
      // if it is, we throw an error which will stop
      // the code here and handle it in the catch area
      // i.e. we throw an error and catch it in catch
      if (!data.length) {
        throw `Nothing found for ${searchTerm}`;
      }

      // here we grab a random result from our images (i.e. our array called data)
      const randomGif = randomChoice(data);

      console.log(data);
      console.log({ randomGif });

      // this is our state!
      // we are going to return the previous state, don't want to overwrite it
      this.setState((prevState, props) => ({
        // get our old props and spread them out there
        ...prevState,

        // add an array of gifs, to deliver lots of videos (gifs)
        // and stack them on top of each toher
        // so, we use our spread to take the prev gifs
        // spread them out, then add a random gif onto the end
        // then map through this array in render, so they show up on the page
        gifs: [...prevState.gifs, randomGif],
        // we turn off our loading spinner again, post-fetch
        loading: false,
        // we update /overwrite the hint text
        // it says 'MORE cats' after the user has looked up cats
        // and cat gits have been shown to them, i.e. the search was successful
        hintText: `Hit enter to see more ${searchTerm}`
      }));

      console.log(data);

      // if our fetch fails, we catch it down here
      // error is an argument that catches our throw
    } catch (error) {
      this.setState((prevState, props) => ({
        // here we overwrite our hint text with error
        //hint text is already in render, a component
        // hence we piggyback on it and update it, no changes in return/render needed
        // spread the previous state, to compare if there's a change (no results found)
        ...prevState,
        hintText: error,
        loading: false
      }));
      console.log(error);
    }
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

  // here we reset the state and clear it all out
  // and making it default again, like in our original state - prevState
  // say, if a user wants to quit the seach and restart
  // also, NO space between "" (no " ")! otherwise, blank space overwrites
  // the input's original form, resulting in no placeholder.
  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: "",
      hintText: "",
      gifs: []
    }));
    // here we grab the input and focus the cursor back onto it
    // refs enable us to access html elements in react code
    // so, console.log(this.textInput) will grab/show the input and give raw HTML
    // focus puts the cursor onto the input for us
    this.textInput.focus();
  };
  render() {
    // pull off search term from this.state
    // create a searchTerm / gif variable off our state and can thus skip this.state.gif... below
    // update: change gif to gifs when we start getting all of our data from the gifs array
    const { searchTerm, gifs, hintText, loading } = this.state;
    // we set a variable to see if we have any gifs
    // if we have no results, then the length is 0
    const hasResults = gifs.length;

    return (
      <div className="page">
        {/* send the method clearSearch to this component as a prop,
         like nameOfMethod = {this.nameOfMethod}
        {} as it's a Javascript function, we send the name of it */}
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />
        <div className="search grid">
          {/* our stack of videos mp4 which we make behave like gifs via loop: mp4 due to better performance */}
          {/* here we loop over our array of gif images from our state and we create
          multiple videos from it 
          so, we go over each one of the gifs
          when it maps over, it gets data from gif (passed in as variable (gif =>)
          and create multiple components (videos) from that*/}
          {this.state.gifs.map(gif => (
            // we spread out all of our properties onto our Gif component
            // properties of each gif, which is an object,
            // passed in as an argument to the map function
            <Gif {...gif} />
          ))}
          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
            ref={input => {
              this.textInput = input;
            }}
          />
        </div>
        {/* grabbing all of our state and passing it onto our component using a spread */}
        {/* passing state and not props because hintText and Loading are in the state */}
        <UserHint loading={loading} hintText={hintText} />
      </div>
    );
  }
}

export default App;
