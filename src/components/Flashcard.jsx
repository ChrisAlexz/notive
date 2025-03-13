import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlashcardTitle from "./FlashcardTitle";
import FlashcardType from "./FlashcardType";
import FlashcardStudy from "./FlashcardStudy";
import FlashcardInput from "./FlashcardInput";
import FlashcardList from "./FlashcardList";
import SuccessPopup from "./SuccessPopup";
import axios from "axios";
import "../styles/Flashcard.css";

export default function Flashcard() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get flashcard set ID from URL

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Basic");
  const [flashcards, setFlashcards] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [setId, setSetId] = useState(null);

  // Fetch the existing set if "id" exists
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/flashcards/${id}`)
        .then((res) => {
          const data = res.data;
          setSetId(data._id);
          setTitle(data.title);
          setType(data.type);
          setFlashcards(data.flashcards);
        })
        .catch((err) => console.error("Error fetching flashcard set:", err));
    }
  }, [id]);

  // Add new flashcard
// Add new flashcard
const addFlashcard = async (front, back) => {
  if (!front.trim() || !back.trim()) return;

  const newFlashcard = { front, back };
  const updatedFlashcards = [...flashcards, newFlashcard];

  setFlashcards(updatedFlashcards);
  setShowSuccess(true);
  setTimeout(() => setShowSuccess(false), 1000);

  try {
    if (setId) {
      // Update existing set
      await axios.put(`http://localhost:5000/flashcards/${setId}`, {
        title,
        type,
        flashcards: updatedFlashcards,
      });
    } else {
      // Create a new set
      const res = await axios.post(`http://localhost:5000/flashcards`, {
        title,
        type,
        flashcards: updatedFlashcards,
      });
      setSetId(res.data.newSet._id); // Save the new set's ID
    }
  } catch (error) {
    console.error("Error saving flashcard set:", error);
  }
};


  // Update existing flashcard
  const updateFlashcard = (index, updatedCard) => {
    setFlashcards(prevFlashcards =>
      prevFlashcards.map((card, i) => (i === index ? { ...card, ...updatedCard } : card))
    );

    if (setId) {
      axios.put(`http://localhost:5000/flashcards/${setId}`, {
        title,
        type,
        flashcards: flashcards.map((card, i) => (i === index ? { ...card, ...updatedCard } : card)),
      }).catch(error => console.error("Error updating flashcard:", error));
    }
  };

  // Delete flashcard
  const handleDelete = (index) => {
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);

    if (setId) {
      axios.put(`http://localhost:5000/flashcards/${setId}`, {
        title,
        type,
        flashcards: updatedFlashcards,
      }).catch(error => console.error("Error deleting flashcard:", error));
    }
  };

  return (
    <div className="flashcard-page">
      <div className="flashcard-container">
        <div className="flashcard-header">
          <h2>{id ? "Edit Flashcards" : "Create Flashcards"}</h2>
        </div>

        <div className="flashcard-header-row">
          <FlashcardTitle title={title} setTitle={setTitle} />
          <FlashcardType type={type} setType={setType} disabled={!title.trim()} />
          {setId && <button className="study-button" onClick={() => navigate(`/study/${setId}`)}>Study</button>}
        </div>

        <FlashcardInput addFlashcard={addFlashcard} disabled={!title.trim()} />
        {showSuccess && <SuccessPopup />}
      </div>

      <FlashcardList flashcards={flashcards} updateFlashcard={updateFlashcard} onDelete={handleDelete} />
    </div>
  );
}
