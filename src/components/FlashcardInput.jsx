// FlashcardInput.jsx
import { useState } from 'react';

export default function FlashcardInput({ addFlashcard, disabled }) {
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');

    const handleAdd = () => {
        addFlashcard(front, back);
        setFront('');
        setBack('');
    };

    return (
        <div className="flashcard-input">
            <h4>Front Side</h4>
            <div className="flashcard-box">
                <input 
                    type="text" 
                    placeholder="Enter front side..." 
                    disabled={disabled}
                    value={front} 
                    onChange={(e) => setFront(e.target.value)}
                />
            </div>

            <h4>Back Side</h4>
            <div className="flashcard-box">
                <input 
                    type="text" 
                    placeholder="Enter back side..." 
                    disabled={disabled}
                    value={back} 
                    onChange={(e) => setBack(e.target.value)}
                />
            </div>
    
            <button onClick={handleAdd}>Add Flashcard</button>
            {disabled && (
                <p style={{color:"red"}}>Please Choose a Title</p>
            )}
        </div>
    );
}
