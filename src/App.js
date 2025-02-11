// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Flashcard from "./components/Flashcard";
import Set from "./components/Set";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        {/* Home page at "/" */}
        <Route path="/" element={<Home />} />

        {/* About page at "/About" */}
        <Route path="/About" element={<About />} />

        {/* 
          "/Set" => see all sets you created 
          (from Set.jsx).
        */}
        <Route path="/Set" element={<Set />} />

        {/* 
          "/flashcards" => create a NEW set 
          (or continue creation if not saved).
        */}
        <Route path="/flashcards" element={<Flashcard />} />

        {/* 
          "/flashcards/:id" => edit/view an EXISTING set 
          (Load that set from DB).
        */}
        <Route path="/flashcards/:id" element={<Flashcard />} />
      </Routes>
    </div>
  );
}

export default App;
