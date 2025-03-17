import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FlashcardStudy.css';

export default function FlashcardStudy() {
  const navigate = useNavigate();

  return (
    <div className="study-box">
      <button
        className="study-button"
        onClick={() => navigate("/study")}
      >
        Study
      </button>
    </div>
  );
}
