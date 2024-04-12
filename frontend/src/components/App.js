import React, { Component } from "react";
import { render } from "react-dom";
// import Home from "./Home";
import Nav from "./Nav";
import Side from "./Side";


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav />
        <Side/>
        
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);