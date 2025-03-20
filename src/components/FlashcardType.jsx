import React from 'react';

export default function FlashcardType({ type, setType, disabled }) {
  return (
    <div className="flashcard-type-container">
      <label className="flashcard-type-label">Type:</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        disabled={disabled}
        style={{ color: 'black' }}
      >
        <option value="Basic">Basic</option>
        <option value="Cloze">Cloze</option>
      </select>
    </div>
  );
}
