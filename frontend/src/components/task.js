import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Important from './important.js'
import './task.css'

export default function Task(props) {
    const [details, setDetails] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/djapp/create_issue", {
            params: {
              projectId: props.projectId 
            }
          });
          setDetails(response.data); 
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
        fetchData();
      },[props.newentry]);
    const [draggedEle,setDragged]=useState([])
    console.log(details)

    function drop(e) {
      const droppedElementText = e.target.dataset.backlogname;
     
      console.log(droppedElementText);
    
      
      setDragged(prevEle => [...prevEle, droppedElementText]);
    
     
      const updatedDetails = details.filter(item => item['backlogName'] !== droppedElementText);
      setDetails(updatedDetails);
    }
  return (
    <>
    <div className="task-container">
      <ul className="task-list">
        {details.map((item,index)=> <li key={index} draggable onDragEnd={drop} data-backlogname={item['backlogName']} className="task-item">
      <p>SCRUM{index+1}</p>
      {item['backlogName']}
    </li>)}
      </ul>
     
    </div>
     <Important imp={draggedEle} setfunc={setDragged} projectid={props.projectId}/>
     </>
  )
}
 