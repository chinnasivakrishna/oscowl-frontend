import React from 'react';
import './Home.css';

const ProjectCard = ({ project, onStatusChange, onDelete }) => {
  const { title, basicDescription, startDate, lastUpdated, client, budget, status, githubLink } = project;

  // Define status styles for visual representation
  const statusStyles = {
    pending: { color: 'orange', background: '#fff3cd' },
    'in progress': { color: 'blue', background: '#cce5ff' },
    completed: { color: 'purple', background: '#f8d7da' },
    done: { color: 'green', background: '#d4edda' },
  };

  return (
    <div className="project-card">
      <h2 className="project-title">{title}</h2>

      <div className="project-details">
        <div className="project-detail">
          <strong>{basicDescription}</strong>
        </div>
      </div>

      {/* Project Details */}
      <div className="project-details">
        <div className="project-detail client">
          <div><strong>Client: </strong>{client}</div>
          <div><strong>Budget: </strong>{budget}</div>
        </div>
      </div>

      {/* Date info */}
      <div className="project-detail dates client">
        <div><strong>Assigned: </strong>{new Date(startDate).toLocaleDateString()}</div>
        <div><strong>Updated: </strong>{new Date(lastUpdated).toLocaleDateString()}</div>
      </div>

      {/* Status Dropdown */}
      <div className='client'>
      <div className="project-status" style={statusStyles[status]}>
        <strong>Status: </strong>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value, project._id)}  // Pass _id (MongoDB's unique identifier)
          className="status-dropdown"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        
      </div>
      {/* Delete button */}
      <button className="delete-button" onClick={() => onDelete(project._id)}>
        Delete
      </button></div>

      {/* Show GitHub link if status is 'completed' */}
      {status === 'completed' && githubLink && (
        <div className="github-link">
          <strong>GitHub Link: </strong>
          <a href={githubLink} target="_blank" rel="noopener noreferrer">{githubLink}</a>
        </div>
      )}

      
    </div>
  );
};

export default ProjectCard;
