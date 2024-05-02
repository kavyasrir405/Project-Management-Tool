import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Function to fetch projects for the current user
        const fetchProjects = async () => {
            try {
                // Get team lead's email from URL
                const userData = JSON.parse(decodeURIComponent(new URLSearchParams(window.location.search).get('user')));
                const teamLeadEmail = userData.email;

                // Make a GET request to your backend endpoint
                const response = await axios.get('/djapp/project_list', {
                    params: {
                        userEmail: teamLeadEmail
                    }
                });

                // Update state with the fetched projects
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        // Call the fetchProjects function when the component mounts
        fetchProjects();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

    // Function to handle project link click
    const handleProjectClick = (projectId) => {
        
        const url = `/home?projectId=${projectId}`;

        window.location.href = url;
    };

    return (
        <div>
            <h2>Project List</h2>
            <ul>
                {projects.map(project => (
                    <li key={project.projectid}>
                       <a href="#" onClick={() => handleProjectClick(project.projectid)}>
    {project.projectname}
</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;
