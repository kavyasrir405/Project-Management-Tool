// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css';
// import Form from './Mycomponents/Form.js'

// const App = () => {
//   const [details, setDetails] = useState([]); // Initialize as an empty object

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000");
//         setDetails(response.data); // Assuming response.data is an object
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       {details.map((key,index) => ( // Use Object.keys to iterate over keys
//         <div key={index}>
//           <h2>{key['employee']}</h2>
//           <h2>{key['department']}</h2> {/* Access value using details[key] */}
//         </div>
//       ))}
//       <Form />
//     </>
//   );
// };

// export default App;

import { useState } from 'react';
import './App.css';
import Header from './Mycomponents/Header.js'
import Nav from './Mycomponents/Nav.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Board from './Mycomponents/board.js'





function App() {
  
  

  const [items,setItem]=useState([])
  function updateItems(newitem){
    setItem((previtem)=>[...previtem,newitem])
  }
  return (
    
    <div className="App">
      <Header />
      <Nav func={updateItems} />
      
      <div className="Content">
      
      </div>
    </div>
  
  );
}

export default App;
