// Navbar.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faFolderOpen, faCircleInfo, faHouse, faBolt } from '@fortawesome/free-solid-svg-icons'
import '../styles/Navbar.css';
import { Link } from 'react-router-dom'; // Import Link
import logo from '../assets/notive.png';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul>
        <li>
          <Link to="/"><FontAwesomeIcon icon={faHouse} />  Home</Link> {/* Link to Home route */}
        </li>
        <li>
          <Link to="/YourLibrary"><FontAwesomeIcon icon={faFolderOpen} />  Library</Link>
        </li>
        <li>
          <Link to='/flashcards'><FontAwesomeIcon icon={faBolt} />  Flashcards</Link>
        </li>
        <li>
        <Link to='/About'><FontAwesomeIcon icon={faCircleInfo} />  About</Link>
        </li>
      </ul>
      <DropdownMenu />
    </div>
  );
}

export default Navbar;