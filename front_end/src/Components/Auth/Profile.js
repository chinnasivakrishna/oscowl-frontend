import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/api';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user profile from API
        const fetchProfile = async () => {
            try {
                const { data } = await getUserProfile();
                setProfile(data);
            } catch (err) {
                navigate('/login');
            }
        };
        fetchProfile();
    }, [navigate]);

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div>
                <strong>Name:</strong> {profile.name}
            </div>
            <div>
                <strong>Email:</strong> {profile.email}
            </div>
            {/* You can add more fields here */}
        </div>
    );
};

export default Profile;
