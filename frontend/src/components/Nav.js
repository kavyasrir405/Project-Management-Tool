import React, { Component } from "react";
import '../../static/css/nav.css';

class Nav extends Component {
  render() {
    return (
      <nav className="nav-container">
        <ul className="nav-list">
          <li className="nav-item"><button className="nav-button">Home</button></li>
          <li className="nav-item"><button className="nav-button">About</button></li>
          <li className="nav-item dropdown">
            <button className="nav-button" onClick={this.toggleDropdown}>Services</button>
            <i className='bx bxs-chevron-down dropdown-arrow'></i>
            <div className="dropdown-content">
              <button className="nav-button">Service 1</button>
              <button className="nav-button">Service 2</button>
              <button className="nav-button">Service 3</button>
            </div>
          </li>
          <li className="nav-item"><button className="nav-button">Contact</button></li>
        </ul>
      </nav>
    );
  }

  toggleDropdown = (event) => {
    const parentLi = event.target.parentElement;
    parentLi.classList.toggle('active');
  }
}

export default Nav;
