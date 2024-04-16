import React, { Component } from "react";
import { render } from "react-dom";
import Nav from "./Nav";
import Side from "./Side";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Login} from "./Login";
import {Home} from "./Home";
import {Navigation} from './Navigation';
import {Logout} from './Logout';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> 
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </BrowserRouter>;
      <Side />
      {/* <Nav />
      <Side /> */}
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);