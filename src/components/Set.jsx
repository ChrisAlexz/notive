import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Set.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Set() {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardSets] = useState([]);

  // Fetch all sets from backend
  useEffect(() => {
    fetchFlashcardSets();

    // Listen for refresh event
    const handleRefresh = () => fetchFlashcardSets();
    window.addEventListener("refreshSets", handleRefresh);

    return () => {
        window.removeEventListener("refreshSets", handleRefresh);
    };
}, []);

  const fetchFlashcardSets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/flashcards");
      setFlashcardSets(res.data);
      console.log("Updated flashcard sets:", res.data);
    } catch (err) {
      console.error("Error fetching flashcard sets:", err);
    }
  };

  const handleSetClick = (id) => {
    navigate(`/flashcards/${id}`);
  };

  const handleDeleteSet = async (setId, e) => {
    e.stopPropagation();
    try {
      const res = await axios.delete(`http://localhost:5000/flashcards/${setId}`); // Added backticks
      if (res.status === 200) {
        setFlashcardSets(prevSets => prevSets.filter(set => set._id !== setId));
      }
    } catch (error) {
      console.error("Error deleting flashcard set:", error);
    }
  };

  return (
    <div className="your-library">
      <h1>Your Sets</h1>
      <div className="flashcard-grid">
        {flashcardSets.length === 0 ? (
          <p>No sets available</p>
        ) : (
          flashcardSets.map((set) => (
            <div
              key={set._id}
              className="flashcard-set"
              onClick={() => handleSetClick(set._id)}
              style={{ cursor: "pointer" }}
            >
              <h2>{set.title}</h2>
              <p>Type: {set.type}</p>
              <p>{set.flashcards.length} flashcards</p>
              <button
                className="del-set"
                onClick={(e) => handleDeleteSet(set._id, e)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
