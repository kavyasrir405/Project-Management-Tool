import React, { Component } from "react";
import { render } from "react-dom";
import Nav from "./Nav";
import Side from "./Side";
import Project from "./Project";
import Home from "./Home";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Home/>
        
        

      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
