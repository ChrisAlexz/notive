import React, { useState } from 'react';
import '../styles/Navbar.css'
import logo from '../assets/notive.png'
import profilePic from '../assets/profilePic.jpg'
import DropdownMenu from './DropdownMenu';
/* global FinisherHeader */
const Navbar = () => {

  return (
    <div className="navbar">

        <img src={logo} alt="" className='logo'/>
        <ul>
           <li>Home</li>
            <li>Your Library</li>
            <li>Notifications</li>
            <li>Flashcards</li>
            <li>About</li>
        </ul>
        <DropdownMenu />

        
    </div>
  )
}

export default Navbar