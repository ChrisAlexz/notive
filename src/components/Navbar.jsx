import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/214661508.png';
import DropdownMenu from './DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faFolderOpen, faHouse, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import AuthContext from './context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useContext(AuthContext);
  
  console.log("Navbar rendering, isLoggedIn:", isLoggedIn);
  console.log("User in Navbar:", user);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <ul>
        <li>
          <Link to="/"> Home</Link>
        </li>
        <li>
          <Link to="/set"> Sets</Link>
        </li>
        <li>
          <Link to="/flashcards"> Flashcards</Link>
        </li>
        <li>
          <Link to="/About"> About</Link>
        </li>
      </ul>
      
      <div className="auth-section">
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
    </div>
  );
};

export default Navbar;