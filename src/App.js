import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from './components/Register';
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Flashcard from "./components/Flashcard";
import Set from "./components/Set";
import FlashcardStudyPage from "./components/FlashcardStudyPage";
import AuthContext from "./components/context/AuthContext"; // Create this context

// Create AuthProvider component
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/set" element={<Set />} />
            <Route path="/flashcards" element={<Flashcard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/flashcards/:id" element={<Flashcard />} />
            <Route path="/study/:id" element={<FlashcardStudyPage />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;