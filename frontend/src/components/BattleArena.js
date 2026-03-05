import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('https://petsimulator.onrender.com');

function BattleArena() {
  const [petId, setPetId] = useState('');
  const [battleLog, setBattleLog] = useState([]);

  useEffect(() => {
    socket.on('battle-update', (data) => {
      setBattleLog(prev => [...prev, data]);
    });

    return () => socket.off('battle-update');
  }, []);

  const joinBattle = () => {
    socket.emit('join-battle', petId);
  };

  const attack = () => {
    socket.emit('attack', { damage: Math.floor(Math.random() * 50) + 10 });
  };

  return (
    <div>
      <h1>Battle Arena</h1>
      <input
        type="text"
        placeholder="Enter Pet ID"
        value={petId}
        onChange={(e) => setPetId(e.target.value)}
      />
      <button onClick={joinBattle}>Join Battle</button>
      <button onClick={attack}>Attack</button>
      <div>
        <h2>Battle Log</h2>
        <ul>
          {battleLog.map((log, index) => (
            <li key={index}>{log.attacker} dealt {log.damage} damage</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BattleArena;