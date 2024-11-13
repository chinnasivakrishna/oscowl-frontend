import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import './Home.css';
import Cookies from 'js-cookie'; // Import js-cookie for working with cookies

const HomePage = () => {
  // State to hold projects
  const [projects, setProjects] = useState([]);

  // States for form inputs
  const [showCompletedForm, setShowCompletedForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [githubLink, setGithubLink] = useState('');

  // Fetch projects from the backend API when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = Cookies.get('jwt_token'); // Assuming the cookie name is 'jwt_token'
        
        if (!token) {
          console.error('No token found in cookies');
          return;
        }

        const response = await axios.get('https://oscowl-backend-xohl.onrender.com/projects', {
          headers: {
            Authorization: `Bearer ${token}`, // Include JWT token in Authorization header
          },
        });

        setProjects(response.data); // Assuming the response data is an array of projects
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleStatusChange = async (status, projectId) => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.put(
        `https://oscowl-backend-xohl.onrender.com/project/${projectId}/status`,
        { status, githubLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the project status in the frontend
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === projectId ? { ...project, status: response.data.status, lastUpdated: response.data.lastUpdated, githubLink } : project
        )
      );

      // Show the form if "completed" status is selected
      if (status === 'completed') {
        setShowCompletedForm(true);
        setSelectedProjectId(projectId); // Track which project is selected for completion
      } else {
        setShowCompletedForm(false);
      }
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get('jwt_token');
      const response = await axios.put(
        `https://oscowl-backend-xohl.onrender.com/project/${selectedProjectId}/completed`,
        { githubLink },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the project status in the frontend
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === selectedProjectId ? { ...project, status: 'completed', githubLink } : project
        )
      );

      // Close the form after submission
      setShowCompletedForm(false);
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleCloseForm = () => {
    setShowCompletedForm(false); // Close the form without submission
  };

  const handleDelete = async (projectId) => {
    const token = Cookies.get('jwt_token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      // Make DELETE request to backend API
      await axios.delete(`https://oscowl-backend-xohl.onrender.com/project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the deleted project from the state
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="projects-container">
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete} // Pass the delete handler to ProjectCard
          />
        ))
      )}

      {showCompletedForm && (
        <div className="completed-form-overlay">
          <div className="completed-form">
            <button className="close-button" onClick={handleCloseForm}>X</button>
            <form onSubmit={handleSubmit} className="completed-form-container">
              <div className="form-group">
                <label>GitHub Link</label>
                <input
                  type="url"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  placeholder="Enter GitHub repository URL"
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
