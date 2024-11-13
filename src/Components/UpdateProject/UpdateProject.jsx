import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import `useNavigate` instead of `useHistory`
import './UpdateProject.css';

// Sample JSON data for projects (Simulating the API data)
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
  }
];

const UpdateProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Use `useNavigate` instead of `useHistory`
  
  const [project, setProject] = useState(null);
  const [githubLink, setGithubLink] = useState('');
  const [zipFile, setZipFile] = useState(null);
  
  // Find the project by id from the static data
  useEffect(() => {
    const foundProject = projectData.find(p => p.id === parseInt(id));
    if (foundProject) {
      setProject(foundProject);
      setGithubLink(foundProject.githubLink || '');
      setZipFile(foundProject.zipFile || null);
    }
  }, [id]);

  const handleDeleteProject = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      // Logic to delete project (e.g., make API call or update state)
      alert("Project Deleted!");
      navigate('/'); // Redirect to homepage after delete
    }
  };

  const handleStatusChange = (e) => {
    setProject({ ...project, status: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (project.status === 'completed' && (!githubLink || !zipFile)) {
      alert("Please provide GitHub link and upload a zip file before marking as completed.");
      return;
    }
    // Logic to update the project (e.g., make an API call to update status)
    alert("Project Updated Successfully!");
    navigate('/'); // Redirect after update
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-project-container">
      <h1>Update Project: {project.title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Status</label>
          <select value={project.status} onChange={handleStatusChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {project.status === 'completed' && (
          <>
            <div className="form-group">
              <label>GitHub Link</label>
              <input 
                type="url" 
                value={githubLink} 
                onChange={(e) => setGithubLink(e.target.value)} 
                required
              />
            </div>
            <div className="form-group">
              <label>Upload Zip File</label>
              <input 
                type="file" 
                onChange={(e) => setZipFile(e.target.files[0])} 
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <button type="submit">Update Project</button>
        </div>
      </form>

      <div className="form-group">
        <button className="delete-btn" onClick={handleDeleteProject}>Delete Project</button>
      </div>
    </div>
  );
};

export default UpdateProjectPage;
