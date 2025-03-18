import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import '../styles/DropdownMenu.css';

const DropdownMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Debugging log
  console.log("DropdownMenu rendering, isOpen:", isOpen);
  console.log("User data:", user);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    console.log("Sign out clicked");
    await logout();
    setIsOpen(false);
    navigate('/'); // Navigate to home page after sign out
  };

  const toggleDropdown = () => {
    console.log("Toggle dropdown, current state:", isOpen);
    setIsOpen(!isOpen);
  };

  const displayName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div 
        className="profile-icon" 
        onClick={toggleDropdown}
        style={{ backgroundColor: '#4facfe', cursor: 'pointer' }}
      >
        {initials}
      </div>
      
      {isOpen && (
        <div className="dropdown-menu" style={{ display: 'block' }}>
          <div className="dropdown-header">
            <p className="user-name">{displayName}</p>
            <p className="user-email">{user?.email}</p>
          </div>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;