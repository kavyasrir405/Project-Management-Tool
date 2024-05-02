import React, { Component } from "react";
import Join from "./Join";
import Create from "./Create";
import Room from "./Room";


import Nav from "./Nav";
import Nav1 from "./Nav1";
import  Project_list from "./Project_list";
import  Accept from "./Accept";


import Side from "./Side";
import Project from "./Project";
import Create_proj_button from"./Create_proj_button";
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
        <Nav1 />

       
      </>} />

      <Route path="/project" element={<>
        < Project_list/>
        <Create_proj_button />
        
      </>} />
          <Route path="" element={<Login />} />

          <Route path="/accept" element={<Accept/>} />
          
          <Route path="/create" element={<Create />} />
          {/* <Route path="/room/:roomCode" element={<Room />} /> */}


        </Routes>
      </Router>
    );
  }
}
