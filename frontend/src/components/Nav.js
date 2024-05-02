import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
import '../../static/css/nav.css';

class Nav extends Component {
  state = {
    loggedOut: false,
    user: null
  };

  componentDidMount() {
    // Extract user object from URL query parameter
    const user = new URLSearchParams(window.location.search).get('user');
    if (user) {
      this.setState({ user: JSON.parse(decodeURIComponent(user)) });
    }
  }

  render() {
    const { loggedOut, user } = this.state;
  
    if (loggedOut) {
      return <Redirect to="/" />;
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
          {user && (
            <li className="nav-item nav-user">
              <span>User:{user.username}</span>
              <span>     &nbsp;&nbsp;</span>
              <span>email: {user.email} </span>
              
              {/* Add other fields here */}
            </li>
          )}
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
