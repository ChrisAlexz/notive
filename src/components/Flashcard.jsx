import { useState } from 'react';
import FlashcardTitle from './FlashcardTitle';
import FlashcardType from './FlashcardType';
import FlashcardInput from './FlashcardInput';
import FlashcardList from './FlashcardList';
import SuccessPopup from './SuccessPopup';
import axios from 'axios';
import '../styles/Flashcard.css';

export default function Flashcard() {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('Basic');
    const [flashcards, setFlashcards] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const addFlashcard = async (front, back) => {
        if (front.trim() && back.trim()) {
            const newFlashcards = [...flashcards, { front, back }];
            setFlashcards(newFlashcards);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 1000);

            // Immediately send to database
            try {
                await axios.post('http://localhost:5000/flashcards', {
                    title,
                    type,
                    flashcards: newFlashcards
                });
            } catch (error) {
                console.error("Error saving flashcard set:", error);
            }
        }
    };

    // Updates a flashcard when field change
    const updateFlashcard = (index, updatedCard) => {
        const newFlashcards = flashcards.map((card,idx)=> {
            if (idx === index) {
                return {...card, ...updatedCard}
            }
            return card
        })
            setFlashcards(newFlashcards)
    }
    const inputsDisabled = !title.trim();

    return (
        <div className="flashcard-page">
        <div className="flashcard-container">
            <div className="flashcard-header">
                <h2>Create Flashcards</h2>
            </div>
            <FlashcardTitle title={title} setTitle={setTitle} />
            <FlashcardType type={type} setType={setType}  disabled={inputsDisabled}/>
            <FlashcardInput addFlashcard={addFlashcard} disabled={inputsDisabled} />
            {showSuccess && <SuccessPopup />}
        </div>
        <div>
            <FlashcardList flashcards={flashcards} updateFlashcard={updateFlashcard} />
        </div>
        </div>
    );
}
