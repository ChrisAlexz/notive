import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import '../styles/Set.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Set() {
  const navigate = useNavigate();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllSets();
  }, []);

  const fetchAllSets = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('flashcard_sets')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        throw error;
      }
      setFlashcardSets(data || []);
    } catch (err) {
      console.error('Error fetching flashcard sets:', err);
      setError('Failed to load sets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSet = async (setId, e) => {
    e.stopPropagation();
    try {
      const { error } = await supabase
        .from('flashcard_sets')
        .delete()
        .eq('id', setId);
      if (error) throw error;
      setFlashcardSets(prev => prev.filter(s => s.id !== setId));
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete set. Please try again.');
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
            key={set.id}
            className="flashcard-set"
            onClick={() => navigate(`/flashcards/${set.id}`)}
          >
            <h2>{set.title}</h2>
            <p>Type: {set.type || 'Basic'}</p>
            {/* If you need the # of cards, do a related query or store them in state */}
            <button
              className="del-set"
              onClick={(e) => handleDeleteSet(set.id, e)}
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
