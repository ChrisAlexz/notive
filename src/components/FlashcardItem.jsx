import { useRef, useEffect } from 'react';
import '../styles/FlashcardList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const FlashcardItem = ({ index, front, back, updateFlashcard, title, type, onDelete }) => {
    const frontRef = useRef(null);
    const backRef = useRef(null);

    // Auto resize text area 
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

    // Resize textareas on initial render
    useEffect(() => {
        autoResize(frontRef.current);
        autoResize(backRef.current);
    }, [front, back]);

    return (
        <div className="flashcard-item">
            <div className="flashcard-header">
                <h3 className="index-num">
                    {index + 1}
                    <button className="delete" onClick={() => onDelete(index)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </h3>
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
