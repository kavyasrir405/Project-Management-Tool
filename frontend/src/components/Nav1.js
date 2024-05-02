import React, { useState } from 'react'
import axios from 'axios'; 
import Tasks from './task.js'

export default function Nav1(props) {
    
    const [inputvalue,setValue]=useState({backlogName:""})
    const [isHovered, setIsHovered] = useState(false);
    const [ishighlight,setHighlight]=useState(false)
    const [newvalue,setNewvalue]=useState('');
    const containerStyle = {
      marginBottom: '20px',
     
    };
  
    const inputStyle = {
      padding: '10px',
      border: ishighlight? '1px solid red':'1px solid #ccc',
      borderRadius: '5px',
      width: '70%',
      marginRight: '10px'
      
    };
  
    const buttonStyle = {
      padding: '10px 20px',
      backgroundColor: isHovered ? '#0056b3' : '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    };
  
    
    function additem(e){
      if (inputvalue.length === 0) {
        
        setHighlight(true)
        return;
      }
      e.preventDefault();
      axios.post("http://localhost:8000/djapp/create_issue", inputvalue)
        .then(response => {
          console.log(response.data);
          setNewvalue(response.data['backlogName'])
        })
        .catch(error => {
          console.error('Error:', error);
          // You can handle error response here
        });
        setValue({ backlogName: '' })
    }
    function handleinput(e){
      if (ishighlight){
        setHighlight(false)
      }

      setValue({  [e.target.name]: e.target.value })
    }
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  return (
    <>
    <div style={containerStyle}>
      <input type="text" value={inputvalue['backlogName']} onChange={handleinput} className='input' id='TypeIssue' style={inputStyle} placeholder='What needs to be done?' name="backlogName"/>
      <button   style={buttonStyle}  onClick={additem}  onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} className='button' id='CreateIssue'>Create Issue</button>
    </div>
    <Tasks newentry={newvalue} />
    </>
  )
}
