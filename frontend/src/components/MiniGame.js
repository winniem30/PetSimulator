import React, { useState } from 'react';
import axios from 'axios';

function MiniGame() {
  const [petId, setPetId] = useState('');
  const [score, setScore] = useState(0);

  const playGame = () => {
    // Simple click game
    const points = Math.floor(Math.random() * 10) + 1;
    setScore(score + points);
  };

  const saveProgress = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      await axios.put(`${apiUrl}/api/pets/${petId}`, { health: 100 + score }); // Example update
      alert('Progress saved!');
    } catch (err) {
      alert('Error saving');
    }
  };

  return (
    <div>
      <h1>Mini Game Trainer</h1>
      <input
        type="text"
        placeholder="Enter Pet ID"
        value={petId}
        onChange={(e) => setPetId(e.target.value)}
      />
      <button onClick={playGame}>Train Pet (Click for points)</button>
      <p>Score: {score}</p>
      <button onClick={saveProgress}>Save Progress</button>
    </div>
  );
}

export default MiniGame;