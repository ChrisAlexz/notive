import React, { useState } from "react";

const DropdownMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="create-account">
        <img 
          src={require('../assets/profilePic.jpg')}
          alt="Profile"
          className="profile-pic"
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className={`custom-dropdown-menu  ${isOpen ? 'active' : ''}`}>
          <ul>
            <li>Settings</li>
            <li>Help and Feedback</li>
            <li>Logout</li>
          </ul>
        </div>
      </div>
    );
  };
export default DropdownMenu;