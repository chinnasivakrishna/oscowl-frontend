import React from 'react';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSquarePlus, faEnvelope, faBook, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <Link to="/dash"><li><FontAwesomeIcon icon={faHome} /></li></Link>
        <Link to="/add-project"><li><FontAwesomeIcon icon={faSquarePlus} /></li> </Link>
        <Link to="/my-project"><li><FontAwesomeIcon icon={faBook} /></li></Link>
        <Link to="/profile"><li><FontAwesomeIcon icon={faUser} /></li></Link>
      </ul>
    </div>
  );
}

export default Sidebar;