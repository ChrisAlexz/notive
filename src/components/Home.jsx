import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [recentSets, setRecentSets] = useState([]);

  // Fetch recent flashcard sets
  useEffect(() => {
    axios.get('http://localhost:5000/flashcards')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setRecentSets(res.data);
        }
      })
      .catch((err) => console.error('Error fetching recent flashcards:', err));
  }, []);

  return (
    <div className="dashboard">
      <div className="intro-section">
        <h1>Welcome Back!</h1>
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

      {/* Recent Flashcard Sets Section */}
      <div className="recents-section">
        <h2>Recent Flashcard Sets</h2>
        <div className="recents-grid">
          {recentSets.length > 0 ? (
            recentSets.map((set) => (
              <div 
                key={set._id} 
                className="flashcard-preview"
                onClick={() => navigate(`/flashcards/${set._id}`)}
              >
                <h2>{set.title}</h2>
                <p>{set.flashcards.length} flashcards</p>
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
