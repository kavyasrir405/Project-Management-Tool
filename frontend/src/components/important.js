import React, { useState,useEffect } from 'react'
import Card from "./card.js"
import axios from 'axios'; 
import './form.css'
import './important.css'

export default function Important(props) {
    const divStyle={
        border:"dotted",
        height:"200px",
        width:"100%"
    }
    const [mapEle,setMap]=useState([])
    const [Ele,setele]=useState([])
    const [Sprints, setSprint] = useState({
        sprint: "",
        start_date: "",
        end_date: "",
        sprint_goals: '', 
        
      });
    const [showForm,setForm]=useState(false)
    console.log("hereee")
    console.log(props.projectid)
    function handleClick(){
    setForm(true) }
    useEffect(() => {
      const fetchSprints = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/djapp/update_backlog/?projectId=${props.projectid}`);
          console.log("mikkkk")
          console.log(response.data)
          setMap(response.data);
        } catch (error) {
          console.error('Error fetching sprint instances:', error);
        }
      };
    
      fetchSprints();
    }, [Ele]);
    
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
      const postData = {
          sprint: Sprints.sprint,
          start_date: Sprints.start_date,
          end_date: Sprints.end_date,
          sprint_goal: Sprints.sprint_goal,
          project:props.projectid,
          issues: props.imp
      };
  
      axios.post("http://localhost:8000/djapp/update_backlog", postData)
          .then(response => {
              setForm(false);
              setele((prevArr) => [...prevArr, response.data]);
              props.setfunc([]);
          })
          .catch(error => {
              console.error('Error:', error);
          });
  };
  return (
    <>
    {/* <div style={divStyle} >
      {props.imp.map((item,index)=><div key={index}>{item}</div>)}
      
    </div> */}
    <div  className='outerdiv'>
  {props.imp.map((item,index) => (
    <div key={index}  className='innerdiv'>
      {item}
    </div>
  ))}
</div>
    <div className="Form">
    <button onClick={handleClick} className="createSprint"> Create Sprint</button></div>
    <div>
    {showForm && (
                <div className="overlay">
                    <div className="popup">
                        <button className="closeButton" onClick={() => setForm(false)}>Close</button>
                        <form className="Form">
                            <input type="text" name="sprint" placeholder="SprintName" onChange={handleChange} /><br />
                            <input type='Date' name='start_date' placeholder="StartDate" onChange={handleChange} /><br />
                            <input type='Date' name='end_date' placeholder="EndDate" onChange={handleChange} /><br />
                            <input type='textField' name='sprint_goal' placeholder="goals" onChange={handleChange} /><br />
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            )}
    </div>
    <div>
      <Card sprints={mapEle}  arr={props.projectid}/>
    </div>

    </>
    
  )}

