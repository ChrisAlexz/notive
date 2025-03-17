import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import { supabase } from "../supabase";

import FlashcardTitle from "./FlashcardTitle";
import FlashcardType from "./FlashcardType";
import FlashcardInput from "./FlashcardInput";
import FlashcardList from "./FlashcardList";
import SuccessPopup from "./SuccessPopup";
import "../styles/Flashcard.css";

export default function Flashcard() {
  const navigate = useNavigate();
  const { id } = useParams(); // If present, we are editing an existing set

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Basic");
  const [flashcards, setFlashcards] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [setId, setSetId] = useState(null);

  // Fetch existing set if "id" exists
  useEffect(() => {
    if (id) {
      fetchExistingSet(id);
    }
  }, [id]);

  const fetchExistingSet = async (theId) => {
    const { data, error } = await supabase
      .from("flashcard_sets")
      .select(`
        *,
        flashcard_cards(*)
      `)
      .eq("id", theId)
      .single();
    if (error) {
      console.error("Error fetching flashcard set:", error);
      return;
    }
    setSetId(data.id);
    setTitle(data.title);
    setType(data.type);
    // we store the array of cards
    // note that each card is { id, front, back, set_id }
    setFlashcards(data.flashcard_cards || []);
  };

  // Add a new flashcard
  const addFlashcard = async (front, back) => {
    if (!front.trim() || !back.trim()) return;

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1000);

    try {
      if (setId) {
        // We already have a set, so just insert one row into flashcard_cards
        const { data, error } = await supabase
          .from("flashcard_cards")
          .insert({
            set_id: setId,
            front,
            back,
          })
          .select(); // returns the inserted row
        if (error) throw error;
        // push to the front-end
        setFlashcards([...flashcards, data[0]]);
      } else {
        // No setId yet => create a new set row
        const { data: newSetData, error: newSetError } = await supabase
          .from("flashcard_sets")
          .insert({
            title,
            type,
          })
          .select()
          .single();
        if (newSetError) throw newSetError;
        setSetId(newSetData.id);

        // now insert the new card
        const { data: insertedCard, error: cardError } = await supabase
          .from("flashcard_cards")
          .insert({
            set_id: newSetData.id,
            front,
            back,
          })
          .select()
          .single();
        if (cardError) throw cardError;

        setFlashcards([insertedCard]);
      }
    } catch (error) {
      console.error("Error saving flashcard set:", error);
    }
  };

  // Update existing flashcard
  const updateFlashcard = async (index, updated) => {
    const cardId = flashcards[index].id; // each card must have an 'id'
    // update local state first
    const updatedArray = flashcards.map((card, i) =>
      i === index ? { ...card, ...updated } : card
    );
    setFlashcards(updatedArray);

    // if we have a card ID in the DB, do an update
    if (cardId) {
      const { error } = await supabase
        .from("flashcard_cards")
        .update(updated)
        .eq("id", cardId);
      if (error) {
        console.error("Error updating flashcard:", error);
      }
    }
  };

  // Delete a flashcard
  const handleDelete = async (index) => {
    const cardToDelete = flashcards[index];
    const updatedFlashcards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedFlashcards);

    // also delete from DB
    if (cardToDelete.id) {
      const { error } = await supabase
        .from("flashcard_cards")
        .delete()
        .eq("id", cardToDelete.id);
      if (error) {
        console.error("Error deleting flashcard:", error);
      }
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
          {setId && (
            <button
              className="study-button"
              onClick={() => navigate(`/study/${setId}`)}
            >
              Study
            </button>
          )}
        </div>

        <FlashcardInput addFlashcard={addFlashcard} disabled={!title.trim()} />
        {showSuccess && <SuccessPopup />}
      </div>

      <FlashcardList
        flashcards={flashcards}
        updateFlashcard={updateFlashcard}
        onDelete={handleDelete}
      />
    </div>
  );
}
