// Navbar.jsx

import React from 'react';
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
          <Link to="/">Home</Link> {/* Link to Home route */}
        </li>
        <li>
          <Link to="/YourLibrary">Library</Link>
        </li>
        <li>
          <Link to='/flashcards'>Flashcards</Link>
        </li>
        <li>
        <Link to='/About'>About</Link>
        </li>
      </ul>
      <DropdownMenu />
    </div>
  );
}

export default Navbar;