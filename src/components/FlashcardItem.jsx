// FlashcardItem.jsx

import { useRef, useEffect } from 'react';
import '../styles/FlashcardList.css';

const FlashcardItem = ({index, front, back, updateFlashcard, title, type, onDelete }) => {
    const frontRef = useRef(null)
    const backRef = useRef(null)

        // auto resize text area 
        const autoResize = (element) => {
            if(element) {
                element.style.height = 'auto'
                element.style.height = element.scrollHeight + 'px'
            }
        }

        const handleFrontChange = (e) => {
            autoResize(e.target)
            updateFlashcard(index, {front: e.target.value})
        }

        const handleBackChange=(e) => {
            autoResize(e.target); 
            updateFlashcard(index, {back: e.target.value})
            
        }

        // resize textareas on initial render
        useEffect(()=> {
            autoResize(frontRef.current)
            autoResize(backRef.current)
        },[front,back])


    return (
        <div className="flashcard-item">
            <h3 className="index-num">{index +1}</h3>
            <div className="front-back">
                <div className="front">
                    <label>
                        Front
                        <textarea 
                        ref={frontRef}
                        value={front}
                        onChange={handleFrontChange}
                        maxLength={1850}
                        style={{overflow: 'hidden', resize: 'none'}}
                        onDelete={onDelete}
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
                    style={{overflow: 'hidden', resize: 'none'}}
                    onDelete={onDelete}
                    />
                </label>
                <button onClick={()=> onDelete(index)}>Delete</button>
            </div>
            
            </div>

            <p>{title}</p>
            <p>{type}</p>
        </div>
    );
};

export default FlashcardItem;
