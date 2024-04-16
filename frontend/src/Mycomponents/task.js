import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Important from './important.js'
import './task.css'

export default function Task(props) {
    const [details, setDetails] = useState([]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:8000");
            setDetails(response.data); // Assuming response.data is an object
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      },[props.newentry]);
    const [draggedEle,setDragged]=useState([])
    function drop(e){
        setDragged((prevele)=>[...prevele,e.target.textContent])
    }
  return (
    <>
    <div className="task-container">
      <ul className="task-list">
        {details.map((item,index)=><li key={index} draggable onDragEnd={drop}  className="task-item"> <p>SCRUM{index+1}</p> {item['backlogName']}</li>)}
      </ul>
     
    </div>
     <Important imp={draggedEle} setfunc={setDragged}/>
     </>
  )
}
 