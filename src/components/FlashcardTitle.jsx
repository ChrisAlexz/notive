// FlashcardTitle.jsx
import React from 'react';
import '../styles/Flashcard.css';

export default function FlashcardTitle({ title, setTitle }) {
  return (
    <div className="flashcard-title-container">
      <label className="flashcard-title-label">Set Name</label>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}
