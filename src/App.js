import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Head/Header';
import AddBlog from './Components/AddProject/AddProject';
import Home from './Components/Home/Home';
import Login from './Components/Login/EmployeeLogin';
import Register from './Components/Register/Register';
// import ProtectedRoute from './Components/ProtectedRoute'; 
import Profile from './Components/Profile/Profile';
import UpdateProjectPage from './Components/UpdateProject/UpdateProject';
import GraphPage from './Components/Graph/GraphPage';
// import Content from './Components/Content/Content';

const Layout = ({ children }) => (
  <div className="app">
    <Sidebar />
    <div className="content">
      {children}
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/my-project" element={<Layout><Home /></Layout>} />
        <Route path="/dash" element={<Layout><GraphPage /></Layout>} />
         <Route path="/add-project" element={<Layout><AddBlog /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/update-project/:id" element={<Layout><UpdateProjectPage /></Layout>} />
        {/*<Route path="/blog/:id" element={<ProtectedRoute><Layout><Content /></Layout></ProtectedRoute>} /> */}
      </Routes>
    </Router>
  );
}

export default App;