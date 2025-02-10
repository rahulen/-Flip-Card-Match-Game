import React from 'react';
import './GameControls.css';

const GameControls = ({ onRestart, winner }) => {
  return (
    <div className="game-controls">
      {winner && <div className="winner-message">Winner: Player {winner}</div>}
      <button onClick={onRestart}>Restart Game</button>
    </div>
  );
};

export default GameControls; 