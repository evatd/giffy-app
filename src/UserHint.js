import React from "react";
import loader from "./images/loader.svg";

// no.1: the flow of the state: every time we update the input,
// it's running the handleChange event,
// setting the state with our search term via setState, cheking if < or > 2 characters
// then our hintText is passed down to our UserHint component in render
// then, it's picked up in the properties inside the actual UserHint component and rendered: the state
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

export default UserHint;