import React, { useState } from 'react';
import axios from 'axios';
import './AddProject.css';
import Cookies from 'js-cookie'; // If you're storing JWT in cookies

function AddProject() {
  const [title, setTitle] = useState('');
  const [basicDescription, setBasicDescription] = useState('');
  const [totalDescription, setTotalDescription] = useState('');
  const [client, setClient] = useState('');
  const [budget, setBudget] = useState('');
  
  // States for images
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [newImage, setNewImage] = useState({ name: '', description: '', image: null });
  const [newImagePreview, setNewImagePreview] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setNewImage({ ...newImage, image: file });
    setNewImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'post_blog'); // Replace with your Cloudinary preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dsbuzlxpw/image/upload', // Replace with your Cloudinary URL
        formData
      );
      const imageUrl = response.data.secure_url;
      setNewImage({ ...newImage, image: imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };

  const handleAddImage = () => {
    setImages([...images, newImage]);
    setImagePreviews([...imagePreviews, newImage.image]);
    setNewImage({ name: '', description: '', image: null });
    setNewImagePreview('');
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const project = {
      title,
      basicDescription,
      totalDescription,
      client,
      budget,
      images, // Array of image objects with names, descriptions, and URLs
    };

    try {
      const token = Cookies.get('jwt_token'); // Assuming JWT is stored in cookies
      if (!token) {
        alert('You are not authenticated');
        return;
      }

      const response = await axios.post(
        'https://oscowl-backend-xohl.onrender.com/project', 
        project, 
        {
          headers: {
            'Authorization': `Bearer ${token}` // Add Bearer token to Authorization header
          }
        }
      );
      console.log('Project saved to DB:', response.data);
      alert('Project Submitted Successfully');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    }
  };

  return (
    <div className="add-project-container">
      <h1>Add a New Project</h1>
      <form onSubmit={handleSubmit} className="add-project-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Basic Description</label>
          <textarea
            value={basicDescription}
            onChange={(e) => setBasicDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Total Description</label>
          <textarea
            value={totalDescription}
            onChange={(e) => setTotalDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Client</label>
          <input
            type="text"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Budget</label>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>

        <h2>Project Images</h2>
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <h3>{image.name}</h3>
            {image.image && <img src={image.image} alt={image.name} className="image-preview" />}
            <p>{image.description}</p>
            <button type="button" onClick={() => handleRemoveImage(index)} className="remove-image-btn">Remove</button>
          </div>
        ))}

        <div className="new-image-form">
          <div className="form-group">
            <label>Image Name</label>
            <input
              type="text"
              value={newImage.name}
              onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Image Description</label>
            <textarea
              value={newImage.description}
              onChange={(e) => setNewImage({ ...newImage, description: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
            {newImagePreview && <img src={newImagePreview} alt="New Upload Preview" className="image-preview" />}
          </div>

          <button type="button" onClick={handleAddImage} className="add-image-btn">Add Image</button>
        </div>

        <button type="submit" className="submit-project-btn">Submit Project</button>
      </form>
    </div>
  );
}

export default AddProject;
