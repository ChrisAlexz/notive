// src/components/About.jsx

import React from 'react';
import Layout from './Layout';

export default function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">About Our Flashcards</h2>
        <p className="text-lg text-gray-300 mb-8">
          Welcome to <span className="font-semibold text-white">Notive</span>, our flashcard-based learning platform, where we bring the power of active recall and spaced repetition to your fingertips.
          Inspired by proven methods, our system helps you study more efficiently, remember concepts longer, and enjoy a personalized learning experience.
        </p>

        <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
        <div className="text-left space-y-4 text-gray-300">
          <p>
            <strong className="text-white">Front & Back System:</strong> Each flashcard has a question (front) and an answer (back). You reveal the answer only when you’re ready,
            encouraging you to truly test your knowledge rather than passively looking at the answer.
          </p>
          <p>
            <strong className="text-white">Four-Option Feedback:</strong> After viewing the answer, choose from four options—Easy, Good, Hard, or Again.
            This feedback tailors the card’s review frequency to your confidence, maximizing retention.
          </p>
          <p>
            Whether you're studying for exams, learning a new language, or mastering any topic, Notive adapts to your pace and progress.
            Let’s make memorization smarter, not harder.
          </p>
        </div>
      </div>
    </Layout>
  );
}
