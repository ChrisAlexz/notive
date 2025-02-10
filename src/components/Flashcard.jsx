import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';  // new
import FlashcardTitle from './FlashcardTitle';
import FlashcardType from './FlashcardType';
import FlashcardInput from './FlashcardInput';
import FlashcardList from './FlashcardList';
import SuccessPopup from './SuccessPopup';
import axios from 'axios';
import '../styles/Flashcard.css';

export default function Flashcard() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Basic');
  const [flashcards, setFlashcards] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Tracks the _id of the set in the DB
  const [setId, setSetId] = useState(null);

  // new: if there's an "id" param, we're in edit mode
  const { id } = useParams();

  // new: if "id" exists, fetch the existing set from the DB
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/flashcards/${id}`)
        .then((res) => {
          const data = res.data;
          setSetId(data._id);
          setTitle(data.title);
          setType(data.type);
          setFlashcards(data.flashcards);
        })
        .catch((err) => console.error("Error fetching flashcard set:", err));
    }
  }, [id]);

  // Called when user clicks "Add Flashcard"
  const addFlashcard = async (front, back) => {
    if (front.trim() && back.trim()) {
      // Add the new card locally
      const newFlashcards = [...flashcards, { front, back }];
      setFlashcards(newFlashcards);

      // Show success popup briefly
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);

      try {
        // If we do NOT have a setId yet, and no "id" param => we are creating the set for first time
        if (!setId) {
          // POST to create
          const response = await axios.post('http://localhost:5000/flashcards', {
            title,
            type,
            flashcards: newFlashcards
          });
          // Save the returned setId so we can update or delete later
          setSetId(response.data.newSet._id);
        } else {
          // We already have a set in the DB (either from edit mode or previously created)
          await axios.put(`http://localhost:5000/flashcards/${setId}`, {
            title,
            type,
            flashcards: newFlashcards
          });
        }
      } catch (error) {
        console.error("Error saving flashcard set:", error);
      }
    }
  };

  // Update a flashcard in local state
  const updateFlashcard = (index, updatedCard) => {
    const newFlashcards = flashcards.map((card, idx) => {
      if (idx === index) {
        return { ...card, ...updatedCard };
      }
      return card;
    });
    setFlashcards(newFlashcards);
  };

  // Delete a single card from local state and DB
  const handleDelete = async (index) => {
    // Remove the card in local state
    const newArr = flashcards.filter((_, i) => i !== index);
    setFlashcards(newArr);

    // Also remove it from the DB if we have a setId
    if (!setId) return; // if no set in DB yet, nothing to remove server-side

    try {
      const res = await fetch(`http://localhost:5000/flashcards/${setId}/card/${index}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error('Could not delete the card in the DB');
      }
      console.log("Deleted card from the DB");
    } catch (err) {
      console.error(err);
    }
  };

  const inputsDisabled = !title.trim();

  return (
    <div className="flashcard-page">
      <div className="flashcard-container">
        <div className="flashcard-header">
          {/* new: dynamic heading based on whether we are editing an existing set */}
          <h2>{id ? "Edit Flashcards" : "Create Flashcards"}</h2>
        </div>

        <div className="flashcard-header-row">
          <FlashcardTitle title={title} setTitle={setTitle} />
          <FlashcardType type={type} setType={setType} disabled={inputsDisabled} />
        </div>

        <FlashcardInput addFlashcard={addFlashcard} disabled={inputsDisabled} />
        {showSuccess && <SuccessPopup />}
      </div>

      <div>
        <FlashcardList
          multiline={false}
          flashcards={flashcards}
          updateFlashcard={updateFlashcard}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
