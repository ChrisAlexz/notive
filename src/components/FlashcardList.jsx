export default function FlashcardList({ flashcards }) {
    if (flashcards.length === 0) return null; // Hide if no flashcards

    return (
        <div className="flashcard-list">
            <h2>Flashcards:</h2>
            {flashcards.map((card, index) => (
                <div key={index} className="flashcard-item">
                    <p><strong>Front:</strong> {card.front}</p>
                    <p><strong>Back:</strong> {card.back}</p>
                </div>
            ))}
        </div>
    );
}