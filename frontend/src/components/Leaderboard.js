import React from 'react';

function Leaderboard() {
  // Mock leaderboard, in real app fetch from API
  const leaderboard = [
    { name: 'Fire Dragon', wins: 10 },
    { name: 'Ice Wolf', wins: 8 }
  ];

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((pet, index) => (
          <li key={index}>{pet.name} - Wins: {pet.wins}</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;