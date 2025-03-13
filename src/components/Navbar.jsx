import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFolderOpen, faCircleInfo, faHouse, faBolt } from '@fortawesome/free-solid-svg-icons';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/214661508.png';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = React.useState(false); // Temporary hardcoded state

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul>
        <li>
          <Link to="/"><FontAwesomeIcon icon={faHouse} />  Home</Link>
        </li>
        <li>
          <Link to="/Set"><FontAwesomeIcon icon={faFolderOpen} />  Sets</Link>
        </li>
        <li>
          <Link to='/flashcards'><FontAwesomeIcon icon={faBolt} />  Flashcards</Link>
        </li>
        <li>
          <Link to='/About'><FontAwesomeIcon icon={faCircleInfo} />  About</Link>
        </li>
      </ul>
      
      {isLoggedIn ? (
        <DropdownMenu />
      ) : (
        <button 
          className="signup-button"
          onClick={() => navigate('/register')}
        >
          Sign Up
        </button>
      )}
    </div>
  );
}

export default Navbar;