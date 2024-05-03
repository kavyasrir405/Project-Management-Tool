import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './card.css';

function SprintCards({ sprints }) {
  const [sprintIssues, setSprintIssues] = useState({});

  useEffect(() => {
    const fetchIssues = async () => {                         
      const issuesData = {};
      try {
        for (const sprint of sprints) {
          const response = await axios.get(`http://localhost:8000/djapp/get_issues/?sprint=${sprint.sprint}`);
          issuesData[sprint.sprint] = response.data;
        }
        setSprintIssues(issuesData);
      } catch (error) {
        console.error('Error fetching issues:', error);
      }
    };

    fetchIssues();
  }, [sprints]);
  
  return (
    <div className="sprint-cards-container">
      {sprints.map((sprint, index) => (
        <div key={index} className="sprint-card">
          <div className="sprint-header">
            <div className="sprint-name">{sprint.sprint}</div>
            <div className="sprint-dates">
              {`${sprint.start_date} - ${sprint.end_date}`}
            </div>
          </div>
          <div className="sprint-issues">
            {sprintIssues[sprint.sprint] && sprintIssues[sprint.sprint].map((issue, idx) => (
              <div key={idx} className="issue">
                {issue.backlogName}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SprintCards;
