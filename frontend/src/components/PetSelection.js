import React, { useState } from 'react';
import axios from 'axios';

function PetSelection() {
  const [petId, setPetId] = useState('');
  const [pet, setPet] = useState(null);

  const fetchPet = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/pets/${petId}`);
      setPet(response.data);
    } catch (err) {
      alert('Pet not found');
    }
  };

  return (
    <div>
      <h1>Select Your Pet</h1>
      <input
        type="text"
        placeholder="Enter Pet ID"
        value={petId}
        onChange={(e) => setPetId(e.target.value)}
      />
      <button onClick={fetchPet}>Fetch Pet</button>
      {pet && (
        <div>
          <h2>{pet.name}</h2>
          <p>Health: {pet.health}</p>
          <p>Wins: {pet.wins}</p>
          <ul>
            {pet.abilities.map((ability, index) => (
              <li key={index}>{ability.name} - Power: {ability.power}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PetSelection;