import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./Nav";
import Nav1 from "./Nav1";
import Project_list from "./Project_list";
import Create_proj_button from "./Create_proj_button";
import Login from "./Login";
import Accept from "./Accept";
import Create from "./Create";
import Side from "./Side";
// import './home.css'
export default class Home extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/home" element={
            <>
              <Nav />
              <Side />
              <div className="content-container">
                <div className="nav1-container">
                  <Nav1 />
                </div>
              </div>
            </>
          } />

          <Route path="/project" element={
            <>
              <Project_list />
              <Create_proj_button />
            </>
          } />

          <Route path="/accept" element={<Accept />} />
          
          <Route path="/create" element={<Create />} />
          <Route path="" element={<Login />} />
        </Routes>
      </Router>
    );
  }
}
