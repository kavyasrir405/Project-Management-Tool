import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios using npm or yarn

export default function Form() {
  const [formData, setFormData] = useState({
    employee: '',
    department: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000", formData)
      .then(response => {
        console.log(response.data);
        // You can handle success response here
      })
      .catch(error => {
        console.error('Error:', error);
        // You can handle error response here
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Employee:
          <input 
            type="text" 
            name="employee" 
            value={formData.employee} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>
          Department:
          <input 
            type="text" 
            name="department" 
            value={formData.department} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
