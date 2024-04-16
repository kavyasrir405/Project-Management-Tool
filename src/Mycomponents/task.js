import React, { useState } from 'react'
import Important from './important.js'
import './task.css'

export default function Task(props) {
    const [draggedEle,setDragged]=useState([])
    function drop(e){
        setDragged((prevele)=>[...prevele,e.target.textContent])
    }
  return (
    <>
    <div className="task-container">
      <ul className="task-list">
        {props.arr.map((item,index)=><li key={index} draggable onDragEnd={drop}  className="task-item"> <p>SCRUM{index+1}</p> {item}</li>)}
      </ul>
     
    </div>
     <Important imp={draggedEle} setfunc={setDragged}/>
     </>
  )
}
 