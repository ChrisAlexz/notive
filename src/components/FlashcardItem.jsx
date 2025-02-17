// FlashcardItem.jsx
import { useRef, useEffect } from 'react';
import '../styles/FlashcardList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FlashcardItem = ({ index, front, back, updateFlashcard, title, type, onDelete }) => {
  const frontRef = useRef(null);
  const backRef = useRef(null);

  // Auto resize textarea
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

      {/* Row at the top: index on the left, trash on the right */}
      <div className="flashcard-top-row">
        <div className="index-num">
          {index + 1}
        </div>
        <button className="delete-btn" onClick={() => onDelete(index)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>

      <div className="front-back">
        <div className="front">
          <label>
            Front
            <textarea
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
              ref={backRef}
              value={back}
              onChange={handleBackChange}
              maxLength={1850}
              style={{ overflow: 'hidden', resize: 'none' }}
            />
          </label>
        </div>
      </div>

      <p>{title}</p>
      <p>{type}</p>
    </div>
  );
};

export default FlashcardItem;
