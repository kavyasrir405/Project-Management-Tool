import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './css/create_project.css'; // Make sure to include the CSS file for styling

const Project = ({ isAuthenticated, user }) => {
    const [showForm, setShowForm] = useState(false); // State variable to control form visibility
    const [projectName, setProjectName] = useState('');
    const navigate = useNavigate(); // Get the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/djapp/create/', {
                projectname: projectName,
                teamlead: user.email
            });
            console.log('Project created:', response.data);
            setProjectName('');
            setShowForm(false); // Hide the form after successful submission
            // Navigate to another page after successful submission using useNavigate
            navigate(`/project/${response.data.projectid}`); 
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    return (
        <div>
            <h1>Create Project</h1>
            {!showForm && (
                <button className="create-project-button" onClick={() => setShowForm(true)}>Create Project</button>
            )}
            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowForm(false)}>&times;</span>
                        <form onSubmit={handleSubmit} className="project-form">
                            <label htmlFor="projectName">Project Name:</label>
                            <input
                                type="text"
                                id="projectName"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                required
                            />
                            <button type="submit">Create Project</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps)(Project);
