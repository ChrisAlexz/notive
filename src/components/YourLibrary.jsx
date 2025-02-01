import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/YourLibrary.css';

export default function YourLibrary() {
    const [flashcardSets, setFlashcardSets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/flashcards')
            .then(res => setFlashcardSets(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="your-library">
            <h1>Your Library</h1>
            <div className="flashcard-grid">
                {flashcardSets.length === 0 ? <p>No sets available</p> : 
                    flashcardSets.map((set) => (
                        <div key={set._id} className="flashcard-set">
                            <h2>{set.title}</h2>
                            <p>Type: {set.type}</p>
                            <p>{set.flashcards.length} flashcards</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
