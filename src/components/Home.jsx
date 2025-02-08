// Home.js

import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import { useNavigate } from 'react-router-dom'; 

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="welcome-container">
        <h2>Welcome!</h2>
      </div>
      <div className='button-container'>
        <button className="btn btn-outline-warning btn-lg create-flashcard" onClick={()=>navigate('./flashcards')}><FontAwesomeIcon icon={faPlus} /> </button>
      </div>
      <div className='recents'>
        <h2>Recents</h2>
      </div>
    </div>
    
  );
}