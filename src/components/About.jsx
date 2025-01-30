import React from 'react';
import '../styles/About.css';

export default function About() {
  return (
    <div className="about-container">
      <div className="welcome-container">
      </div>
      <div className="about-details">
        <h2>About Our Flashcards</h2>
        <p className="para">Welcome to notive, our flashcard-based learning platform, where we bring the power of active recall and spaced repetition to your fingertips. Inspired by proven methods, our system helps you study more efficiently, remember concepts longer, and enjoy a personalized learning experience.</p>
        <h2 className="about-details">How it works</h2>
        <p className="para">Front & Back System: Each flashcard has a question (front) and an answer (back). 
          You reveal the answer only when you’re ready, encouraging you to truly test your knowledge rather than passively looking at the answer.
          Four-Option Feedback: After viewing the answer, choose from four options—Easy, Good, Hard, or Again—to rate how well you knew the material.
          Adaptive Review: 
          Based on your selection, our algorithm schedules when you’ll see that card again. This spaced repetition method ensures you revisit difficult material more often, while letting you move on from easy material faster. </p>
        
        {/* Add more content as needed */}
      </div>
    </div>
  );
}
