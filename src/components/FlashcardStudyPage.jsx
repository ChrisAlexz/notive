// src/pages/FlashcardStudyPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";
import "../styles/FlashcardStudyPage.css";

export default function FlashcardStudyPage() {
  const { id } = useParams(); // ID of the flashcard set
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [deckType, setDeckType] = useState("Basic");

  useEffect(() => {
    if (id) {
      fetchFlashcardSet(id);
    }
  }, [id]);

  const fetchFlashcardSet = async (setId) => {
    // First, get the flashcard set to determine its type
    const { data: setData, error: setError } = await supabase
      .from("flashcard_sets")
      .select("*")
      .eq("id", setId)
      .single();

    if (setError) {
      console.error("Error fetching flashcard set:", setError);
      return;
    }

    if (setData) {
      setDeckType(setData.type);
    }

    // Then, get the cards
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

  // Process cloze text for Cloze-type flashcards
  const processClozeText = (text, isRevealed) => {
    if (deckType !== "Cloze") return text;
    if (isRevealed) {
      return text.replace(/{{c1::(.*?)}}/g, '<span class="cloze-revealed">$1</span>');
    } else {
      return text.replace(/{{c1::(.*?)}}/g, '[...]');
    }
  };

  if (flashcards.length === 0) {
    return <p>Loading flashcards...</p>;
  }

  const currentCard = flashcards[currentIndex];
  const hasCustomBackContent =
    deckType === "Cloze" &&
    currentCard.back !== currentCard.front &&
    currentCard.back.trim() !== "";

  return (
    <div className="study-container">
      <div className="flashcard-study-box">
        <div className="flashcard-front">
          {deckType === "Cloze" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: processClozeText(currentCard.front, showBack),
              }}
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: currentCard.front }} />
          )}
        </div>

        {!showBack ? (
          <button className="show-answer-btn" onClick={handleShowAnswer}>
            Show Answer
          </button>
        ) : (
          <>
            {(deckType !== "Cloze" || hasCustomBackContent) && (
              <div className="flashcard-back">
                <div dangerouslySetInnerHTML={{ __html: currentCard.back }} />
              </div>
            )}

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
