import React, { useRef, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAuthContext from './context/UserAuthContext';
import '../styles/DropdownMenu.css';

const DropdownMenu = () => {
  const { user, logout } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Keep existing useEffect and handlers the same
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
    await logout();
    setIsOpen(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Updated avatar URL retrieval
  const googleIdentity = user?.identities?.find(
    (identity) => identity.provider === 'google'
  );
  const avatarUrl = googleIdentity?.identity_data?.avatar_url || 
                    user?.user_metadata?.picture;
  const displayName = user?.user_metadata?.name || 
                     user?.email?.split('@')[0] || 
                     'User';

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="profile-icon" onClick={toggleDropdown}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className="profile-avatar" />
        ) : (
          displayName.charAt(0).toUpperCase()
        )}
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