
import { useState } from 'react';
import './App.css';
import Header from './Mycomponents/Header.js'
import Nav from './Mycomponents/Nav.js'
import Tasks from './Mycomponents/task.js'




function App() {

  const [items,setItem]=useState([])
  function updateItems(newitem){
    setItem((previtem)=>[...previtem,newitem])
  }
  return (
    <div className="App">
       <Header /> 
      <Nav func={updateItems}/>
      <Tasks arr={items} />
      
    </div>
  );
}

export default App;
