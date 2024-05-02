import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import '../../static/css/nav.css';

class Nav extends Component {
  state = {
    loggedOut: false
  };

  render() {
    const user_email = new URLSearchParams(window.location.search).get('user_email');
  
    if (this.state.loggedOut) {
      window.location.href = '/'; 
    }

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
          <li className="nav-item"><button className="nav-button" onClick={this.handleLogout}>Logout</button></li>
          {user_email&& <li className="nav-item"><span className="nav-user">user_email: {user_email}</span></li>}
        </ul>
      </nav>
    );
  }

  toggleDropdown = (event) => {
    const parentLi = event.target.parentElement;
    parentLi.classList.toggle('active');
  }

  handleLogout = () => {
    // Perform logout actions
    axios.post('http://localhost:8000/djapp/logout')
      .then(response => {
        if (response.status === 200) {
          this.setState({ loggedOut: true });
        } else {
          console.error('Logout failed');
        }
      })
      .catch(error => console.error('Error during logout:', error));
  }
}

export default Nav;
