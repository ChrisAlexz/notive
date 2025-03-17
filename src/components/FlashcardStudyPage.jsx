import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { supabase } from "../supabase";
import "../styles/FlashcardStudyPage.css";

export default function FlashcardStudyPage() {
  const { id } = useParams(); // ID of the flashcard set
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    if (id) {
      fetchFlashcards(id);
    }
  }, [id]);

  const fetchFlashcards = async (setId) => {
    // either fetch from flashcard_sets with a join, or directly from flashcard_cards
    const { data, error } = await supabase
      .from("flashcard_cards")
      .select("*")
      .eq("set_id", setId);
    if (error) {
      console.error("Error fetching flashcards:", error);
      return;
    }
    setFlashcards(data || []);
  };

  const handleShowAnswer = () => setShowBack(true);

  const handleNextCard = () => {
    setShowBack(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  if (flashcards.length === 0) {
    return <p>Loading flashcards...</p>;
  }

  return (
    <div className="study-container">
      <div className="flashcard-study-box">
        <div className="flashcard-front">
          <h3>{flashcards[currentIndex].front}</h3>
        </div>

        {!showBack ? (
          <button className="show-answer-btn" onClick={handleShowAnswer}>
            Show Answer
          </button>
        ) : (
          <>
            <div className="flashcard-back">
              <h3>{flashcards[currentIndex].back}</h3>
            </div>

            <div className="difficulty-buttons">
              <button className="again-btn" onClick={handleNextCard}>Again</button>
              <button className="hard-btn" onClick={handleNextCard}>Hard</button>
              <button className="good-btn" onClick={handleNextCard}>Good</button>
              <button className="easy-btn" onClick={handleNextCard}>Easy</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
