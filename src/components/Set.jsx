import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Set.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Set() {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlashcardSets();
    const handleRefresh = () => fetchFlashcardSets();
    window.addEventListener("refreshSets", handleRefresh);
    return () => window.removeEventListener("refreshSets", handleRefresh);
  }, []);

  const fetchFlashcardSets = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/flashcards/all");
      setFlashcardSets(res.data);
    } catch (err) {
      setError("Failed to load sets. Please try again later.");
      console.error("Error fetching flashcard sets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSet = async (setId, e) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/flashcards/${setId}`);
      setFlashcardSets(prev => prev.filter(set => set._id !== setId));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Failed to delete set. Please try again.");
    }
  };

  return (
    <div className="your-library">
      <h1>Your Sets</h1>
      {loading && <p>Loading sets...</p>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="flashcard-grid">
        {!loading && flashcardSets.length === 0 && (
          <p>No sets available. Create your first set!</p>
        )}

        {flashcardSets.map((set) => (
          <div
            key={set._id}
            className="flashcard-set"
            onClick={() => navigate(`/flashcards/${set._id}`)}
          >
            <h2>{set.title}</h2>
            <p>Type: {set.type || 'Basic'}</p>
            <p>{set.flashcards.length} flashcards</p>
            <button
              className="del-set"
              onClick={(e) => handleDeleteSet(set._id, e)}
              aria-label="Delete set"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}