import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Home from './components/Home';
import About from './components/About';
import Set from './components/Set';
import Flashcard from './components/Flashcard';
import FlashcardStudyPage from './components/FlashcardStudyPage';
import Register from './components/authentication/Register';
import Navbar from './components/Navbar';
import FlashcardStudy from "./components/FlashcardStudy"
import AuthProvider from './components/context/AuthProvider'; // We'll create this below

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <div className='page-content' >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/set" element={<Set />} />
            <Route path="/register" element={<Register />} />
            <Route path="/flashcards" element={<Flashcard />} />
            <Route path="/flashcards/:id" element={<Flashcard />} />
            <Route path="/study/:id" element={<FlashcardStudyPage />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
