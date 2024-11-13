import React, { useState } from 'react';
import './Register.css';
import 'boxicons/css/boxicons.min.css';
import axios from 'axios';
import register from '../photos/file.png';
import Cookies from 'js-cookie';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null); // State for profile image
  const [profileImageUrl, setProfileImageUrl] = useState(''); // State to store Cloudinary URL
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form validation
  const validate = () => {
    let valid = true;
    let errors = {};

    if (!username) {
      valid = false;
      errors['username'] = 'Username is required';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      valid = false;
      errors['email'] = 'Valid email is required';
    }

    if (!password || password.length < 6) {
      valid = false;
      errors['password'] = 'Password must be at least 6 characters';
    }

    setErrors(errors);
    return valid;
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'post_blog'); // Use your Cloudinary preset

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dsbuzlxpw/image/upload', formData);
      console.log(response.data.secure_url)
      setProfileImageUrl(response.data.secure_url); // Save the Cloudinary URL
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      try {
        // Prepare form data to send, including the Cloudinary image URL
        const formData = {
          username,
          email,
          password,
          profileImage: profileImageUrl, // Send the Cloudinary URL instead of the file itself
        };

        const response = await axios.post(
          'https://oscowl-backend-xohl.onrender.com/register', // Update this URL with your backend
          formData
        );

        if (response.data.token) {
          // On successful registration, store the JWT token in cookies
          Cookies.set('jwt_token', response.data.token, { expires: 1 }); // Set token expiration as needed
          alert('Registration successful');
          window.location.href = '/login'; // Redirect to login page after successful registration
        }
      } catch (error) {
        console.error(error);
        alert('Error occurred during registration');
      }
    } else {
      setIsSubmitted(false);
    }
  };

  // Image preview before form submission
  const imagePreview = profileImage ? URL.createObjectURL(profileImage) : register;

  return (
    <div>
      <div className="register-form-container">
        <div className="register-form">
          <div className="register-form__title">Register</div>
          <form onSubmit={handleSubmit}>
            <div className="register-form__input-box">
              <div className="register-form__input-wrapper">
                <input
                  type="text"
                  className="register-form__input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <i className="bx bxs-user register-form__icon"></i>
              </div>
              {errors.username && <div className="register-form__error">{errors.username}</div>}
            </div>

            <div className="register-form__input-box">
              <div className="register-form__input-wrapper">
                <input
                  type="email"
                  className="register-form__input"
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <i className="bx bxs-envelope register-form__icon"></i>
              </div>
              {errors.email && <div className="register-form__error">{errors.email}</div>}
            </div>

            <div className="register-form__input-box">
              <div className="register-form__input-wrapper">
                <input
                  type="password"
                  className="register-form__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i className="bx bxs-lock-alt register-form__icon"></i>
              </div>
              {errors.password && <div className="register-form__error">{errors.password}</div>}
            </div>

            {/* Profile Image Upload */}
            <div className="register-form__input-box">
              <div className="register-form__input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="register-form__input image"
                  
                />
                <i className="bx bxs-image register-form__icon"></i>
              </div>
              {profileImage && (
                <div className="register-form__image-preview">
                  <img src={imagePreview} alt="Profile" className="register-form__image" />
                </div>
              )}
            </div>

            <div className="register-form__btn-container">
              <button type="submit" className="register-form__btn">Register</button>
            </div>
          </form>
        </div>
        <div className="register-image">
          <img src={register} className="register-images" alt="Register" />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
