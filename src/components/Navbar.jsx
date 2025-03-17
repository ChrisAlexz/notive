import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/214661508.png';
import DropdownMenu from './DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faEnvelope, faFolderOpen, faHouse, faBolt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = React.useState(false); // Hard-coded or from AuthContext

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
          <Link to="/set"><FontAwesomeIcon icon={faFolderOpen} />  Sets</Link>
        </li>
        <li>
          <Link to="/flashcards"><FontAwesomeIcon icon={faBolt} />  Flashcards</Link>
        </li>
        <li>
          <Link to="/about"><FontAwesomeIcon icon={faCircleInfo} />  About</Link>
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
};

export default Navbar;
