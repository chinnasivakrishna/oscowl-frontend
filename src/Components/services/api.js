import axios from 'axios';

const API_URL = 'https://oscowl-backend-xohl.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Set the Authorization header if the user is logged in
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

// User Authentication
export const registerUser = async (name, email, password) => {
    return api.post('/users/register', { name, email, password });
};

export const loginUser = async (email, password) => {
    return api.post('/users/login', { email, password });
};

// Task Management
export const createTask = async (title, description) => {
    return api.post('/tasks', { title, description });
};

export const getTasks = async () => {
    return api.get('/tasks');
};

export const updateTask = async (taskId, title, description, status) => {
    return api.put(`/tasks/${taskId}`, { title, description, status });
};

export const deleteTask = async (taskId) => {
    return api.delete(`/tasks/${taskId}`);
};

export const getUserProfile = async () => {
    return api.get('/users/profile'); // Assuming you have an endpoint for getting the user's profile
};