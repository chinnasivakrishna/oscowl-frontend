import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks } from '../services/api';

const HomePage = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await getTasks();
            setTasks(data);
        };

        fetchTasks();
    }, []);

    return (
        <div className="home-container">
            <h2>Your Tasks</h2>
            <Link to="/tasks">
                <button className="btn">Manage Tasks</button>
            </Link>
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        <span>{task.title}</span> - <strong>{task.status}</strong>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
