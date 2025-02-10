// Set.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Set.css';


export default function Set() {
    const navigate = useNavigate();
    const [flashcardSets, setFlashcardSets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/flashcards')
            .then(res => setFlashcardSets(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSetClick = (id) => {
        navigate(`/createflashcard/${id}`) 
    }

    return (
        <div className="your-library">
            <h1>Your Library</h1>
            <div className="flashcard-grid">
                {flashcardSets.length === 0 ? <p>No sets available</p> : 
                    flashcardSets.map((set) => (
                        <div key={set._id} className="flashcard-set" 
                        onClick={() => handleSetClick(set._id)}
                        style={{cursor: 'pointer'}}
                        >
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
