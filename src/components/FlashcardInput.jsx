import { useState } from 'react';

export default function FlashcardInput({ addFlashcard }) {
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
                    value={front} 
                    onChange={(e) => setFront(e.target.value)}
                />
            </div>

            <h4>Back Side</h4>
            <div className="flashcard-box">
                <input 
                    type="text" 
                    placeholder="Enter back side..." 
                    value={back} 
                    onChange={(e) => setBack(e.target.value)}
                />
            </div>

            <button onClick={handleAdd}>Add Flashcard</button>
        </div>
    );
}
