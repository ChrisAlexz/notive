import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import '../styles/Home.css';
import AuthContext from './context/AuthContext';

export default function Home() {
  const navigate = useNavigate();
  const [recentSets, setRecentSets] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecents = async () => {
      const { data, error } = await supabase
        .from('flashcard_sets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) {
        console.error('Error fetching recent flashcards:', error);
      } else {
        setRecentSets(data || []);
      }
    };
    fetchRecents();
  }, []);

  const getWelcomeName = () => {
    if (!user) return "Welcome Back!";
    return `Welcome ${user.user_metadata?.name}!` || `Welcome ${user.email.split('@')[0]}!`;
  };

  return (
    <div className="dashboard">
      <div className="intro-section">
        <h1>{getWelcomeName()}</h1>
        <p>Start studying or create new flashcards.</p>
      </div>

      <div className="action-area">
        <button
          className="new-set-button"
          onClick={() => navigate('/flashcards')}
        >
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
    </div>
  );
}