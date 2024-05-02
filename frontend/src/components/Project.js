import React, { Component } from "react";
import axios from 'axios';
import '../../static/css/project.css';
import AddTeamMembers from "./AddTeamMembers";

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      useremail: ""
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    const teamlead_mail = new URLSearchParams(window.location.search).get('user_email');
    console.log(teamlead_mail)
    event.preventDefault();
    const { projectname, useremail } = this.state;
    axios.post('/djapp/proj', {
      projectname: projectname,
      useremail: useremail,
      teamlead_mail: teamlead_mail
    })
    .then(response => {
      console.log(response.data);
      // Do something with the response if needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  render() {
    // const teamlead_mail = new URLSearchParams(window.location.search).get('teamlead_mail');

    return (
      <div className="proj">
        <h2>Create Project</h2>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            name="projectname" 
            placeholder="Enter project name" 
            value={this.state.projectname} 
            onChange={this.handleChange} 
          />
          <input 
            type="email" 
            name="useremail" 
            placeholder="Enter email" 
            value={this.state.useremail} 
            onChange={this.handleChange} 
          />
            {/* <input 
            type="hidden" 
            name="teamlead_mail" 
           
            value={teamlead_mail} 
            onChange={this.handleChange} 
          /> */}
          <button type="submit">Submit</button>
        </form>

        <AddTeamMembers />
      </div>
    );
  }
}

export default Project;
