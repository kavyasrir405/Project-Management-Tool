import React, { Component } from "react";
import axios from 'axios';
import '../../static/css/project.css';
import AddTeamMembers from "./AddTeamMembers";

class Create_proj_button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectname: "",
      useremail: "",
      showModal: false
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    const userData = JSON.parse(decodeURIComponent(new URLSearchParams(window.location.search).get('user')));
    const teamlead_mail = userData.email;
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
    // Close modal after form submission
    this.setState({ showModal: false });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  };

  render() {
    const { projectname, useremail, showModal } = this.state;

    return (
      <div className="proj">
        <button onClick={this.toggleModal}>Create Project</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.toggleModal}>&times;</span>
              <form onSubmit={this.handleSubmit}>
                <h2>Create Project</h2>
                <input 
                  type="text" 
                  name="projectname" 
                  placeholder="Enter project name" 
                  value={projectname} 
                  onChange={this.handleChange} 
                />
                <br></br>
                <input 
                  type="email" 
                  name="useremail" 
                  placeholder="Enter email" 
                  value={useremail} 
                  onChange={this.handleChange} 
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        )}

        
      </div>
    );
  }
}

export default Create_proj_button;
