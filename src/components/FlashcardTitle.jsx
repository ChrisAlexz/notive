// src/components/FlashcardTitle.jsx
import React from 'react';
import '../styles/Flashcard.css';

export default function FlashcardTitle({ title, setTitle }) {
  return (
    <div className="flashcard-title-container">
      <label className="flashcard-title-label">Deck Name</label>
      <input
        type="text"
        placeholder="Enter deck name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ color: 'black' }} // <-- ensure black text
      />
    </div>
  );
}
