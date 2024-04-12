import React, { Component } from "react";
import Join from "./Join";
import Create from "./Create";
import Room from "./Room";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<p>This is the hmmome page</p>} />
          <Route path="/join" element={<Join />} />
          <Route path="/create" element={<Create />} />
          {/* <Route path="/room/:roomCode" element={<Room />} /> */}


        </Routes>
      </Router>
    );
  }
}
