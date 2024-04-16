import React, { useState, useEffect } from 'react';
import '../../static/css/nav.css';

function Navigation() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">SALTY</div>
        <ul className="nav">
          <li className="nav-item">
            {isAuth && <a href="/" className="nav-link">Home</a>}
          </li>
          <li className="nav-item">
            {isAuth ? (
              <a href="/logout" className="nav-link">Logout</a>
            ) : (
              <a href="/login" className="nav-link">Login</a>
            )}
          </li>
        </ul>
      </nav>
      <nav className="nav-container">
        
      </nav>
    </div>
  );
}

export default Navigation;
