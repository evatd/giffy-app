import React from "react";
import clearButton from "./images/close-icon.svg";

// no.1: the flow of the state: every time we update the input,
// it's running the handleChange event,
// setting the state with our search term via setState, cheking if < or > 2 characters
// then our hintText is passed down to our UserHint component in render
// then, it's picked up in the properties inside the actual UserHint component and rendered: the state

// no.2: we pick out our props inside the header component
// we can pass down functions as props as well as things
// like numbers, strings, arrays, or objects
// so, we pass functions clearSearch and hasResults down to Header, via render
// pass into Header as arguments - inside ({}) !
// and trigger them via onClick inside the Header component
const Header = ({ clearSearch, hasResults }) => (
  <div className="header grid">
    {/* if we have results, show the clear icon, otherwise the title
    so that the user can restart the search
    add the onClick onto the button itself */}
    {hasResults ? (
      <button onClick={clearSearch}>
        <img src={clearButton} />
      </button>
    ) : (
      <h1 className="title">Giffy</h1>
    )}
  </div>
);

export default Header;
