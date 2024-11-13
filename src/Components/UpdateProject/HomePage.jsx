import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Sample JSON data for projects
const projectData = [
  {
    id: 1,
    title: "Web Design Project",
    description: "A website design project for a local business.",
    client: "Tech Innovators Ltd.",
    budget: "$20,000",
    status: "pending",
    startDate: "2024-01-15",
    lastUpdated: "2024-10-01",
    githubLink: null,
    zipFile: null
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "A mobile application project for an e-commerce platform.",
    client: "Global Retailers Inc.",
    budget: "$35,000",
    status: "in-progress",
    startDate: "2024-02-20",
    lastUpdated: "2024-11-10",
    githubLink: null,
    zipFile: null
  },
  {
    id: 3,
    title: "E-commerce Website",
    description: "Building a complete e-commerce platform with integrated payment systems.",
    client: "Retail Master Co.",
    budget: "$50,000",
    status: "completed",
    startDate: "2024-03-10",
    lastUpdated: "2024-09-05",
    githubLink: "https://github.com/retailmasterco/ecommerce-website",
    zipFile: "ecommerce-project.zip"
  },
  {
    id: 4,
    title: "Digital Marketing Campaign",
    description: "A marketing campaign project for a new product launch.",
    client: "Digital Ads Co.",
    budget: "$15,000",
    status: "pending",
    startDate: "2024-05-01",
    lastUpdated: "2024-08-15",
    githubLink: null,
    zipFile: null
  },
  {
    id: 5,
    title: "Customer Portal Development",
    description: "Developing a customer portal with secure login and profile management.",
    client: "Service Providers Inc.",
    budget: "$45,000",
    status: "in-progress",
    startDate: "2024-07-05",
    lastUpdated: "2024-11-12",
    githubLink: null,
    zipFile: null
  }
];

const HomePage = () => {
  const [projects, setProjects] = useState(projectData);
  const [filterStatus, setFilterStatus] = useState('');

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredProjects = filterStatus
    ? projects.filter(project => project.status === filterStatus)
    : projects;

  return (
    <div className="projects-container">
      <h1>Project List</h1>
      
      <div className="filter">
        <select onChange={handleFilterChange} value={filterStatus}>
          <option value="">All Projects</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="project-cards">
        {filteredProjects.map((project) => (
          <div key={project.id} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p><strong>Client:</strong> {project.client}</p>
            <p><strong>Budget:</strong> {project.budget}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(project.lastUpdated).toLocaleDateString()}</p>
            
            <Link to={`/update-project/${project.id}`} className="update-link">Update Project</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
