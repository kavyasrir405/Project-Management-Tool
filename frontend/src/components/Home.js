import React, { Component } from "react";
import Join from "./Join";
import Create from "./Create";
import Room from "./Room";


import Nav from "./Nav";
import Side from "./Side";
import Project from "./Project";
import Login from "./Login";


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
        <Route path="/home" element={<>
        <Nav />
        <Side />
        <Project />
      </>} />
          <Route path="" element={<Login />} />
          <Route path="/create" element={<Create />} />
          {/* <Route path="/room/:roomCode" element={<Room />} /> */}


        </Routes>
      </Router>
    );
  }
}
