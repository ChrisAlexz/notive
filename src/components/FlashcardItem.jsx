import React, { useRef, useEffect } from 'react';
import '../styles/FlashcardList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FlashcardItem = ({ index, front, back, updateFlashcard, onDelete }) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);

  // Auto-resize the textarea so it grows with content
  const autoResize = (element) => {
    if (element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`;
    }
  };

  // Handle front text change
  const handleFrontChange = (e) => {
    autoResize(e.target);
    if (updateFlashcard) {
      updateFlashcard(index, { front: e.target.value });
    }
  };

  // Handle back text change
  const handleBackChange = (e) => {
    autoResize(e.target);
    if (updateFlashcard) {
      updateFlashcard(index, { back: e.target.value });
    }
  };

  // Run auto-resize whenever front/back text changes (or on mount)
  useEffect(() => {
    autoResize(frontRef.current);
    autoResize(backRef.current);
  }, [front, back]);

  return (
    <div className="flashcard-item">
      {/* Top row with index & delete icon */}
      <div className="flashcard-top-row">
        <div className="index-num">{index + 1}</div>
        <button className="delete-btn" onClick={() => onDelete(index)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      {/* Front & Back sections side by side */}
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
              style={{ overflow: 'hidden', resize: 'none' }}
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
              style={{ overflow: 'hidden', resize: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FlashcardItem;
