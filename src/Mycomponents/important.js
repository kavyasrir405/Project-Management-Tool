import React, { useState } from 'react'
import Card from "./card.js"

export default function Important(props) {
    const divStyle={
        border:"solid",
        height:"200px",
        width:"350px"
    }
    const [mapEle,setMap]=useState([])
    function handleClick(){
      setMap((prevarr)=>[...prevarr,props.imp]);
      props.setfunc([])

    }
  return (
    <>
    <div style={divStyle} >
      {props.imp.map((item,index)=><div key={index}>{item}</div>)}
      
    </div>
    <button onClick={handleClick}> Create Sprint</button>
    <div>
      <Card arr={mapEle}/>
    </div>
    </>
    
  )
}
