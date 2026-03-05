import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PetSelection from './components/PetSelection';
import BattleArena from './components/BattleArena';
import MiniGame from './components/MiniGame';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Pet Selection</Link> | 
          <Link to="/battle">Battle Arena</Link> | 
          <Link to="/minigame">Mini Game</Link> | 
          <Link to="/leaderboard">Leaderboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<PetSelection />} />
          <Route path="/battle" element={<BattleArena />} />
          <Route path="/minigame" element={<MiniGame />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
