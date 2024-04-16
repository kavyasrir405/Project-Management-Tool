import React, { useState } from 'react'
import Card from "./card.js"
import axios from 'axios'; 

export default function Important(props) {
    const divStyle={
        border:"solid",
        height:"200px",
        width:"350px"
    }
    const [mapEle,setMap]=useState([])
    const [Sprints, setSprint] = useState({
        sprint: "",
        start_date: "",
        end_date: "",
        sprint_goals: '', 
        issues: []
      });
    const [showForm,setForm]=useState(false)
    function handleClick(){
    //   setMap((prevarr)=>[...prevarr,props.imp]);
    //   props.setfunc([])
    setForm(true)

    }
    function handleChange(e){

        e.preventDefault();

    
        const name = e.target.name;
        const value = e.target.value;

        // Check if the value is not empty
        if (value.trim() !== '') {
          setSprint((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        }
      }
        
    
        
    const handleSubmit = (e) => {
            e.preventDefault();
            axios.post("http://localhost:8000/updatbacklog", Sprints)
              .then(response => {
                setForm(false)
                // You can handle success response here
              })
              .catch(error => {
                console.error('Error:', error);
                // You can handle error response here
              });
          };
  return (
    <>
    <div style={divStyle} >
      {props.imp.map((item,index)=><div key={index}>{item}</div>)}
      
    </div>
    <div className="Form">
    <button onClick={handleClick}> Create Sprint</button>
    {showForm && (
        <form>
          <input type="text" name="sprint" placeholder="SprintName" onChange={handleChange} />
          <input type='Date' name='start_date' placeholder="StartDate" onChange={handleChange}/>
          <input type='Date' name='end_date' placeholder="EndDate" onChange={handleChange} />
          <input type='textField'  name='sprint_goal' placeholder="goals" onChange={handleChange} />
          <button type="submit" onClick={handleSubmit} >Submit</button>
        </form>
      )}
    </div>
    <div>
      <Card arr={mapEle}/>
    </div>

    </>
    
  )}

