// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        
        {/* 
          "/Set" (capital S) will display all sets in the library
          from your Set.jsx component
        */}
        <Route path="/Set" element={<Set />} />

        {/* 
          "/flashcards" (no :id) => create a brand new set
          (Or continue editing if you didn’t finish creation.)
        */}
        <Route path="/flashcards" element={<Flashcard />} />

        {/* 
          "/flashcards/:id" => edit an EXISTING set 
          (Load that set by its _id and display in edit mode.)
        */}
        <Route path="/flashcards/:id" element={<Flashcard />} />
      </Routes>
    </div>
  );
}

export default App;
