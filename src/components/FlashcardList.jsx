//FlashcardList.jsx

import FlashcardItem from './FlashcardItem';
import '../styles/FlashcardList.css'

const FlashcardList = ({ flashcards, updateFlashcard , onDelete}) => {
    return (
        <div className="flashcard-list">
            {flashcards.length === 0 ? (
                <p>No flashcards added yet.</p>
            ) : (
                flashcards.map((card, index) => (
                    <FlashcardItem key={index}
                    index={index}
                     front={card.front} 
                     back={card.back}
                     updateFlashcard={updateFlashcard}
                     onDelete={onDelete} />
                ))
            )}
        </div>
    );
};

export default FlashcardList;
