// src/components/SuccessPopup.jsx
import React, { useEffect } from 'react';
import '../styles/Flashcard.css';

export default function SuccessPopup({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000); // 1 second
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-popup" style={{ pointerEvents: 'none' }}>
      Flashcard Added!
    </div>
  );
}
