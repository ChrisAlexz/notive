import { useState } from 'react';
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

  // NEW: track the _id of the set in the DB
  const [setId, setSetId] = useState(null);

  // Create or update the flashcard set in the DB
  const addFlashcard = async (front, back) => {
    if (front.trim() && back.trim()) {
      // Add the new card to local state
      const newFlashcards = [...flashcards, { front, back }];
      setFlashcards(newFlashcards);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);

      try {
        if (!setId) {
          // If we haven't created a set in the DB yet, do POST
          const response = await axios.post('http://localhost:5000/flashcards', {
            title,
            type,
            flashcards: newFlashcards
          });
          // Save the returned setId so we can delete individual cards later
          setSetId(response.data.newSet._id);
        } else {
          // If set already exists, do PUT (or PATCH) to update the flashcards array
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

  // Delete a single card from the set by index
  const handleDelete = async (index) => {
    // Remove the card in local state first for immediate UI update
    const newArr = flashcards.filter((_, i) => i !== index);
    setFlashcards(newArr);

    // Also remove it from the DB, if we have a setId
    if (!setId) return;  // if no setId, nothing to delete in DB yet

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
          <h2>Create Flashcards</h2>
        </div>
        <div className="flashcard-header-row">
          <FlashcardTitle title={title} setTitle={setTitle} />
          <FlashcardType type={type} setType={setType} disabled={inputsDisabled} />
        </div>

        <FlashcardInput addFlashcard={addFlashcard} disabled={inputsDisabled} />
        {showSuccess && <SuccessPopup />}
      </div>

      <div>
        {/* Pass handleDelete to FlashcardList so items can call it */}
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
