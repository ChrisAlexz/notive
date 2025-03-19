// src/components/Set.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import UserAuthContext from './context/UserAuthContext'; // <-- changed
import ClassDeckModal from './ClassDeckModal';
import '../styles/Set.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Set() {
  const { user } = useContext(UserAuthContext); // <-- changed
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedClasses, setExpandedClasses] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) fetchClasses();
  }, [user]);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`*, flashcard_sets (*)`)
        .eq('user_id', user.id)
        .order('name', { ascending: true });

      if (!error && data) {
        setClasses(data);
        const expanded = {};
        data.forEach(cls => {
          expanded[cls.id] = true;
        });
        setExpandedClasses(expanded);
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleClass = (classId) => {
    setExpandedClasses(prev => ({
      ...prev,
      [classId]: !prev[classId]
    }));
  };

  const handleDeleteClass = async (classId, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this class and all its decks?')) return;

    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', classId);

      if (!error) {
        setClasses(prev => prev.filter(c => c.id !== classId));
      }
    } catch (err) {
      console.error('Error deleting class:', err);
    }
  };

  const handleDeleteDeck = async (deckId, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this deck?')) return;

    try {
      const { error } = await supabase
        .from('flashcard_sets')
        .delete()
        .eq('id', deckId);

      if (!error) {
        setClasses(prev =>
          prev.map(c => ({
            ...c,
            flashcard_sets: c.flashcard_sets.filter(d => d.id !== deckId)
          }))
        );
      }
    } catch (err) {
      console.error('Error deleting deck:', err);
    }
  };

  const handleEditDeck = (deckId, e) => {
    e.stopPropagation();
    navigate(`/flashcards/${deckId}`);
  };

  const handleStudyDeck = (deckId, e) => {
    e.stopPropagation();
    navigate(`/study/${deckId}`);
  };

  const handleAddDeck = (classId) => {
    setSelectedClassId(classId);
    setShowModal(true);
  };

  return (
    <div className="set-container">
      <div className="set-header">
        <h1>Your Flashcard Sets</h1>
        <button className="add-set-btn" onClick={() => setShowModal(true)}>
          + New Set
        </button>
      </div>

      {classes.length === 0 ? (
        <div className="empty-state">
          <p>You don't have any classes or flashcard sets yet.</p>
          <button onClick={() => setShowModal(true)}>Create Your First Set</button>
        </div>
      ) : (
        <div className="class-list">
          {classes.map(cls => (
            <div key={cls.id} className="class-item">
              <div className="class-header" onClick={() => toggleClass(cls.id)}>
                <div className="class-title">
                  <FontAwesomeIcon
                    icon={expandedClasses[cls.id] ? faChevronDown : faChevronRight}
                    className="expand-icon"
                  />
                  <h3>{cls.name}</h3>
                  <span className="deck-count">
                    {cls.flashcard_sets.length}{' '}
                    {cls.flashcard_sets.length === 1 ? 'deck' : 'decks'}
                  </span>
                </div>
                <div className="class-actions">
                  <button
                    className="add-deck-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddDeck(cls.id);
                    }}
                    title="Add deck"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    className="delete-class-btn"
                    onClick={(e) => handleDeleteClass(cls.id, e)}
                    title="Delete class"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              {expandedClasses[cls.id] && (
                <div className="deck-list">
                  {cls.flashcard_sets.length === 0 ? (
                    <div className="empty-decks">
                      <p>No decks in this class yet</p>
                      <button
                        className="add-first-deck"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddDeck(cls.id);
                        }}
                      >
                        Add Deck
                      </button>
                    </div>
                  ) : (
                    cls.flashcard_sets.map(deck => (
                      <div key={deck.id} className="deck-item">
                        <div className="deck-info" onClick={() => handleStudyDeck(deck.id)}>
                          <h4>{deck.title}</h4>
                        </div>
                        <div className="deck-actions">
                          <button
                            className="edit-deck-btn"
                            onClick={(e) => handleEditDeck(deck.id, e)}
                            title="Edit deck"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="delete-deck-btn"
                            onClick={(e) => handleDeleteDeck(deck.id, e)}
                            title="Delete deck"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ClassDeckModal
          onClose={() => {
            setShowModal(false);
            setSelectedClassId(null);
          }}
          onSuccess={() => {
            fetchClasses();
            setShowModal(false);
          }}
          preselectedClassId={selectedClassId}
        />
      )}
    </div>
  );
}
