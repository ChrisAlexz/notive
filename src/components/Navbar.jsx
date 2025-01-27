import React from 'react'
import '../styles/Navbar.css'
import logo from '../assets/notive.png'
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
        <div className="search-box">
            <input type="text" placeholder='Search'/>
            <img src="" alt="" />
        </div>

        <img src="" alt="" className='toggle-icon'/>
    </div>
  )
}

export default Navbar