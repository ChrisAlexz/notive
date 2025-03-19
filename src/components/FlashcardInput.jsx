// src/components/FlashcardInput.jsx
import React, { useState } from 'react';
import "../styles/FlashcardInput.css";

export default function FlashcardInput({ addFlashcard, disabled }) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const handleAdd = () => {
    if (!front.trim() || !back.trim()) {
      console.error("Cannot add flashcard. Front or back is empty.");
      return;
    }
    addFlashcard(front, back);
    setFront('');
    setBack('');
  };

  const autoResizeTextarea = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="flashcard-input">
      <h4>Front Side</h4>
      <div className="flashcard-box">
        <textarea
          placeholder="Enter front side..."
          disabled={disabled}
          value={front}
          onChange={(e) => {
            setFront(e.target.value);
            autoResizeTextarea(e);
          }}
          style={{ overflow: 'hidden', resize: 'none', color: 'black' }}
        />
      </div>

      <h4>Back Side</h4>
      <div className="flashcard-box">
        <textarea
          placeholder="Enter back side..."
          disabled={disabled}
          value={back}
          onChange={(e) => {
            setBack(e.target.value);
            autoResizeTextarea(e);
          }}
          style={{ overflow: 'hidden', resize: 'none', color: 'black' }}
        />
      </div>

      <button
        className="add-flashcard-btn"
        onClick={handleAdd}
        disabled={disabled}
      >
        Add Flashcard
      </button>

      {disabled && (
        <p style={{ color: "red" }}>Please enter a Deck Name first</p>
      )}
    </div>
  );
}
