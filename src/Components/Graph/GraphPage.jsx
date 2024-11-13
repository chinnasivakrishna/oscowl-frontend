// src/GraphPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Cookies from 'js-cookie';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './GraphPage.css'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraphPage = () => {
  const [statusData, setStatusData] = useState({});
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = Cookies.get('jwt_token');
        if (!token) {
          console.error('No token found in cookies');
          return;
        }

        const response = await axios.get('https://oscowl-backend-xohl.onrender.com/projects', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        generateStatusData(response.data); // Update status data for the bar graph
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Function to generate data for the status bar graph
  const generateStatusData = (projects) => {
    const statusCounts = { 'in progress': 0, completed: 0, 'not started': 0 };

    projects.forEach((project) => {
      if (project.status === 'in progress') statusCounts['in progress']++;
      else if (project.status === 'completed') statusCounts.completed++;
      else statusCounts['not started']++;
    });

    setStatusData(statusCounts);
  };

  // Chart.js data and options for the bar graph
  const chartData = {
    labels: ['In Progress', 'Completed', 'Not Started'],
    datasets: [
      {
        label: 'Project Status Counts',
        data: [
          statusData['in progress'] || 0,
          statusData.completed || 0,
          statusData['not started'] || 0,
        ],
        backgroundColor: ['#3498db', '#2ecc71', '#f39c12'], // Different colors for each status
        borderColor: ['#2980b9', '#27ae60', '#f1c40f'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Project Status Distribution',
        font: {
          size: 16,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="chart-container">
      <h2>Project Status Overview</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraphPage;
