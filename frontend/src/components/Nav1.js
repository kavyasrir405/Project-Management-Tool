import React, { useState,useEffect } from 'react'
import axios from 'axios'; 
import Tasks from './task.js'
import { useLocation } from 'react-router-dom';

export default function Nav1(props) {
    
    
    const [isHovered, setIsHovered] = useState(false);
    const [ishighlight,setHighlight]=useState(false)
    const [newvalue,setNewvalue]=useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('projectId');
    const [inputvalue,setValue]=useState({backlogName:""})
    

    
  
    const containerStyle = {
      marginBottom: '20px',
      display:"flex",
       justifyContent:"space-around",
       marginTop:'75px'
     
    };
  
    const inputStyle = {
      padding: '10px',
      border: ishighlight? '1px solid red':'1px solid #ccc',
      borderRadius: '5px',
      width: '70%',
      marginLeft: '60px'
      
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
      const postData = {
        backlogName: inputvalue.backlogName,
        projectId: projectId
    };
      e.preventDefault();
      
      axios.post("http://localhost:8000/djapp/create_issue", postData)
        .then(response => {
          
          setNewvalue(response.data['backlogName'])
        })
        .catch(error => {
          console.error('Error:', error);
          
        });
        setValue({ backlogName: '' })
    }
    function handleinput(e){
      if (ishighlight){
        setHighlight(false)
      }

      setValue({
        backlogName: e.target.value
    });
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
      <input   type="text" value={inputvalue['backlogName']} onChange={handleinput} className='input' id='TypeIssue' style={inputStyle} placeholder='What needs to be done?' name="backlogName"/>
      <button   style={buttonStyle}  onClick={additem}  onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} className='button' id='CreateIssue'>Create Issue</button>
    </div>
    <h2 className='text' style={{ marginLeft: '500px' }}>Backlogs </h2>
    <Tasks newentry={newvalue} projectId={projectId} />
    </>
  )
}
