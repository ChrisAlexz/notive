// src/components/FlashcardItem.jsx
import React, { useRef, useEffect } from 'react';
import '../styles/FlashcardList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FlashcardItem = ({ index, front, back, updateFlashcard, onDelete }) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);

  // Auto-resize helper
  const autoResize = (element) => {
    if (element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  const handleFrontChange = (e) => {
    autoResize(e.target);
    updateFlashcard(index, { front: e.target.value });
  };

  const handleBackChange = (e) => {
    autoResize(e.target);
    updateFlashcard(index, { back: e.target.value });
  };

  useEffect(() => {
    autoResize(frontRef.current);
    autoResize(backRef.current);
  }, [front, back]);

  return (
    <div className="flashcard-item">
      <div className="flashcard-top-row">
        <div className="index-num">{index + 1}</div>
        <button className="delete-btn" onClick={() => onDelete(index)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="front-back">
        <div className="front">
          <label>
            Front
            <textarea
              className="text-front"
              ref={frontRef}
              value={front}
              onChange={handleFrontChange}
              maxLength={1850}
              style={{ overflow: 'hidden', resize: 'none', color: 'white' }}
            />
          </label>
        </div>

        <div className="back">
          <label>
            Back
            <textarea
              className="text-back"
              ref={backRef}
              value={back}
              onChange={handleBackChange}
              maxLength={1850}
              style={{ overflow: 'hidden', resize: 'none', color: 'white' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FlashcardItem;
