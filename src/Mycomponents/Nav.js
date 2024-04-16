import React, { useState } from 'react'

export default function Nav(props) {
    const [inputvalue,setValue]=useState('')
    const [isHovered, setIsHovered] = useState(false);
    const [ishighlight,setHighlight]=useState(false)

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
  
    
    function additem(){
      if (inputvalue.length === 0) {
        
        setHighlight(true)
        return;
      }
        props.func(inputvalue)
        setValue('')
    }
    function handleinput(e){
      if (ishighlight){
        setHighlight(false)
      }

        setValue(e.target.value)
    }
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
    };
  return (
    <div style={containerStyle}>
      <input type="text" value={inputvalue} onChange={handleinput} className='input' id='TypeIssue' style={inputStyle} placeholder='What needs to be done?'/>
      <button   style={buttonStyle}  onClick={additem}  onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} className='button' id='CreateIssue'>Create Issue</button>
    </div>
  )
}
