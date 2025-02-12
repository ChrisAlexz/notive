// Flashcard.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlashcardTitle from "./FlashcardTitle";
import FlashcardType from "./FlashcardType";
import FlashcardInput from "./FlashcardInput";
import FlashcardList from "./FlashcardList";
import SuccessPopup from "./SuccessPopup";
import axios from "axios";
import "../styles/Flashcard.css";

export default function Flashcard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Basic");
  const [flashcards, setFlashcards] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [setId, setSetId] = useState(null);

  // Check if we have an :id param
  const { id } = useParams();

  // If "id" exists, fetch the existing set from the DB for editing
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

  // Called when user clicks "Add Flashcard"
  const addFlashcard = async (front, back) => {
    if (front.trim() && back.trim()) {
      // Add card locally
      const newFlashcards = [...flashcards, { front, back }];
      setFlashcards(newFlashcards);

      // Show success popup briefly
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);

      try {
        if (!setId) {
          // We don't have a set in DB yet => POST (create)
          const response = await axios.post("http://localhost:5000/flashcards", {
            title,
            type,
            flashcards: newFlashcards,
          });

          // Save the DB-generated _id
          setSetId(response.data.newSet._id);
        } else {
          // Already have a set => PUT (update)
          await axios.put(`http://localhost:5000/flashcards/${setId}`, {
            title,
            type,
            flashcards: newFlashcards,
          });
        }
      } catch (error) {
        console.error("Error saving flashcard set:", error);
      }
    }
  };

  // Update a flashcard in local state
  const updateFlashcard = (index, updatedCard) => {
    const newFlashcards = flashcards.map((card, idx) => {
      if (idx === index) {
        return { ...card, ...updatedCard };
      }
      return card;
    });
    setFlashcards(newFlashcards);
  };

  // Delete a single card from local state and DB
  const handleDelete = async (index) => {
    // Remove from local state
    const newArr = flashcards.filter((_, i) => i !== index);
    setFlashcards(newArr);
  
    if (!setId) return; // If no set in DB yet, skip DB delete
  
    try {
      const res = await fetch(
        `http://localhost:5000/flashcards/${setId}/card/${index}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error("Could not delete the card in the DB");
      }
    } catch (err) {
      console.error(err);
    }
  };
  

  // Disable input fields if no title has been entered
  const inputsDisabled = !title.trim();

  return (
    <div className="flashcard-page">
      <div className="flashcard-container">
        <div className="flashcard-header">
          <h2>{id ? "Edit Flashcards" : "Create Flashcards"}</h2>
        </div>

        <div className="flashcard-header-row">
          <FlashcardTitle title={title} setTitle={setTitle} />
          <FlashcardType type={type} setType={setType} disabled={inputsDisabled} />
        </div>

        <FlashcardInput addFlashcard={addFlashcard} disabled={inputsDisabled} />
        {showSuccess && <SuccessPopup />}
      </div>

      <div>
        <FlashcardList
          multiline={false}
          flashcards={flashcards}
          updateFlashcard={updateFlashcard}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
