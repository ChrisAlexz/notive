// Navbar.jsx

import React from 'react';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom'; // Import Link
import logo from '../assets/notive.png';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="Logo" className='logo' />
      <ul>
        <li>
          <Link to="/">Home</Link> {/* Link to Home route */}
        </li>
        <li>Your Library</li>
        <li>Notifications</li>
        <li>Flashcards</li>
        <li>About</li>
      </ul>
      <DropdownMenu />
    </div>
  );
}

export default Navbar;