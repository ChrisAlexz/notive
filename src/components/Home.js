// Home.js

import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="welcome-container">
        <h2>Welcome!</h2>
      </div>
      <div className="recents">
        <h3>Recents</h3>
        <div className="recents-content">
          {/* Add recent items here */}
        </div>
      </div>
    </div>
  );
}