// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Flashcard from "./components/Flashcard"
import YourLibrary from "./components/YourLibrary"

function App() {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/flashcards" element={<Flashcard/>} /> 
        <Route path="/yourlibrary" element={<YourLibrary />} />
      </Routes>
    </div>
  );
}

export default App;
