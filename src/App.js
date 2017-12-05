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
    {loading ? <img className="block mx-auto" alt="loader" src={loader} /> : hintText}
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
      hintText: ""
    };
  }

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
      alert(`search for ${value}`);
    }
  };

  render() {
    // pull off search term from this.state
    const { searchTerm } = this.state;
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* {our stack of gif images} */}
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