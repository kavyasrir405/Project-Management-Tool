import React, { Component } from "react";

import { Link } from "react-router-dom";



export default class Create extends Component {
 
  constructor(props) {

    super(props);
    this.state={
      guest_Can_pause:true,
      votes_to_skip:2

    };
this.handleCreateButtonPressed=  this.handleCreateButtonPressed.bind(this)
this.handlePauseChange=this.handlePauseChange.bind(this)
this.handleVotesChange=this.handleVotesChange.bind(this)
  }
  handleVotesChange(e){
    this.setState({
      votes_to_skip:e.target.value
    });
  }
  handlePauseChange(e){
    this.setState({
      guest_Can_pause: e.target.value ==='true'? true :false
    });
  }
handleCreateButtonPressed(){

const requestOptions={
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    votes_to_skip: this.state. votes_to_skip,
    guest_Can_pause:this.state.guest_Can_pause
  })
};
fetch('/djapp/create',requestOptions).then((response)=>response.json()).then((data)=>console.log(data));
}
  render() {
    return (
      <div>
        <h1>create room</h1>
        
          <button onClick={this.handleCreateButtonPressed}>Create</button>
        
        <Link to="/"> 
          <button>Home</button>
        </Link>

        <input type="radio" id="play_pause" name="options" value="true" onChange={this.handlePauseChange}></input>
        <label for="play_pause">"PlayPause</label>
        <input type="radio" id="no_control" name="options" value="false"
        onChange={this.handlePauseChange}></input>
<label for="no_control">No control</label>
<br></br>
<br></br>

<br></br>
<label>votes to skip</label>
<input type="number" id="numberInput" name="numberInput" min="2" max="20 " onChange={this.  handleVotesChange}>
</input>

      </div>
    );
  }
}