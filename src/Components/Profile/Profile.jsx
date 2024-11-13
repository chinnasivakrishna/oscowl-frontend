import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios'; // Import axios for API calls
import Cookies from 'js-cookie'; // For handling authentication cookies

const Profile = () => {
  const [user, setUser] = useState(null); // Initially set to null to indicate no data is loaded yet
  const [updatedUser, setUpdatedUser] = useState(null); // To hold the edited user data
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // For handling loading state
  const [imagePreview, setImagePreview] = useState(''); // To preview the uploaded image
  const [imageUrl, setImageUrl] = useState(''); // To store the URL of the uploaded image

  // Fetch user profile data when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get('jwt_token'); // Get auth token from cookies
        const response = await axios.get('https://oscowl-backend-xohl.onrender.com/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the request headers for authentication
          },
        });
        setUser(response.data); // Store fetched user data
        setUpdatedUser(response.data); // Store the initial user data for edits
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchUserProfile();
  }, []);

  // Handle the change in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  // Handle the image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file)); // Preview the image locally

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'post_blog'); // Cloudinary upload preset

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dsbuzlxpw/image/upload', // Replace with your Cloudinary URL
        formData
      );
      setImageUrl(response.data.secure_url); // Store the URL from Cloudinary
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Handle saving the profile
  const handleSave = async () => {
    try {
      const token = Cookies.get('jwt_token'); // Get auth token from cookies
      const updatedData = {
        ...updatedUser,
        profileImage: imageUrl || updatedUser.profileImage, // Use the new URL if it exists
      };
      console.log(updatedData)
      const response = await axios.put(
        'https://oscowl-backend-xohl.onrender.com/profile',
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the request headers for authentication
          },
        }
      );
      setUser(response.data); // Update user data with the response from backend
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Handle canceling the edit
  const handleCancel = () => {
    setUpdatedUser(user); // Reset to the original data if cancel is clicked
    setIsEditing(false); // Exit editing mode
  };

  // Show loading screen while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={user.profileImage || 'https://via.placeholder.com/150'} // Fallback image if no profile picture
          alt="Profile"
          className="profile-picture"
        />
        {isEditing && (
          <div>
            <input
              type="file"
              name="profileImage"
              className="upload-picture"
              onChange={handleImageUpload}
            />
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
          </div>
        )}
        {!isEditing && <h2>{user.name}</h2>}
      </div>

      <div className="profile-info">
        {isEditing ? (
          <>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="profile-input"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="profile-input"
              />
            </label>

            <label>
              Phone
              <input
                type="text"
                name="phone"
                value={updatedUser.phone}
                onChange={handleChange}
                className="profile-input"
              />
            </label>

            <label>
              Bio
              <textarea
                name="bio"
                value={updatedUser.bio}
                onChange={handleChange}
                className="profile-input"
              />
            </label>
          </>
        ) : (
          <>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Bio:</strong> {user.bio}
            </p>
          </>
        )}
      </div>

      <div className="profile-actions">
        {isEditing ? (
          <>
            <button className="action-button save" onClick={handleSave}>
              Save
            </button>
            <button className="action-button cancel" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button
            className="action-button edit"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
