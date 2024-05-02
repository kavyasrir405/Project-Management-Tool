import React, { useState } from 'react';
import axios from 'axios';
import '../../static/css/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/djapp/login', formData);
      console.log('Login successful:', response.data);
      
      // Redirect to home page with user ID as query parameter
      window.location.href = `/project?user=${encodeURIComponent(JSON.stringify(response.data.user))}`; 
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="login-container"> {/* Apply the CSS class to the container */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="current-password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
