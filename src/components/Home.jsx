// src/components/Home.jsx
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import '../styles/Home.css';
import UserAuthContext from './context/UserAuthContext'; // <-- changed
import ClassDeckModal from './ClassDeckModal';

export default function Home() {
  const navigate = useNavigate();
  const [recentSets, setRecentSets] = useState([]);
  const { user } = useContext(UserAuthContext); // <-- changed
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    const fetchRecents = async () => {
      const { data, error } = await supabase
        .from('flashcard_sets')
        .select('*')
        .eq('user_id', user?.id) // If user is null, this yields no results
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching recent flashcards:', error);
      } else {
        setRecentSets(data || []);
      }
    };

    // Only fetch if user is defined
    if (user) {
      fetchRecents();
    }
  }, [user]);

  const getWelcomeName = () => {
    if (!user) return "Welcome Back!";
    return `Welcome ${user.user_metadata?.name}!` || `Welcome ${user.email.split('@')[0]}!`;
  };

  const handleNewSetClick = () => {
    setShowModal(true);
  };

  // Just for demonstration
  const handleModalClose = () => {
    console.log('Home.jsx: handleModalClose called. Hiding modal overlay.');
    setShowModal(false);
  };

  const handleSetCreated = (deckId) => {
    // do any callback logic if needed
    console.log('Home.jsx: onSuccess -> deck created with id:', deckId);
  };
  return (
    <div className="dashboard">
      <div className="intro-section">
        <h1>{getWelcomeName()}</h1>
        <p>Start studying or create new flashcards.</p>
      </div>

      <div className="action-area">
        <button className="new-set-button" onClick={handleNewSetClick}>
          + New Set
        </button>
      </div>

      <div className="recents-section">
        <h2>Recent Flashcard Sets</h2>
        <div className="recents-grid">
          {recentSets.length > 0 ? (
            recentSets.map((set) => (
              <div 
                key={set.id}
                className="flashcard-preview"
                onClick={() => navigate(`/flashcards/${set.id}`)}
              >
                <h2>{set.title}</h2>
              </div>
            ))
          ) : (
            <p className="empty-message">No recent flashcard sets. Create one now!</p>
          )}
        </div>
      </div>

      {showModal && (
        <ClassDeckModal 
          onClose={handleModalClose} 
          onSuccess={handleSetCreated}
        />
      )}
    </div>
  );
}
