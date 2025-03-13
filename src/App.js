import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Flashcard from "./components/Flashcard";
import Set from "./components/Set";
import FlashcardStudyPage from "./components/FlashcardStudyPage"; // Import Study Page

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Set" element={<Set />} />
          <Route path="/flashcards" element={<Flashcard />} />
          <Route path="/flashcards/:id" element={<Flashcard />} />
          <Route path="/study/:id" element={<FlashcardStudyPage />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;
