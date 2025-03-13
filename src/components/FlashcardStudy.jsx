// FlashcardStudy.jsx
import React from 'react'
import '../styles/FlashcardStudy.css'
import { useNavigate } from 'react-router-dom'; 

export default function FlashcardStudy() {
  const navigate = useNavigate();
  return (
    <div className='study-box'>
        <button className="btn btn-outline-warning btn-lg study-button" onClick={()=>navigate("/study")}>Study</button>

    </div>
  )
}
