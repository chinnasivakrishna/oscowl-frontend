import React, { useState } from 'react';
import { createTask, deleteTask, updateTask, getTasks } from '../services/api';

const TaskPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [tasks, setTasks] = useState([]);

    const handleAddTask = async () => {
        await createTask(title, description);
        setTitle('');
        setDescription('');
        setStatus('pending');
        fetchTasks();
    };

    const handleUpdateTask = async (taskId) => {
        await updateTask(taskId, title, description, status);
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        fetchTasks();
    };

    const fetchTasks = async () => {
        const { data } = await getTasks();
        setTasks(data);
    };

    return (
        <div className="task-container">
            <h2>Manage Tasks</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
            />
            <select onChange={(e) => setStatus(e.target.value)} value={status}>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="done">Done</option>
            </select>
            <button onClick={handleAddTask}>Add Task</button>

            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <div>{task.title} - {task.status}</div>
                        <button onClick={() => handleUpdateTask(task._id)}>Update</button>
                        <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskPage;
