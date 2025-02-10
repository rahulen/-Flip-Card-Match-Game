import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ scores, currentPlayer }) => {
  return (
    <div className="scoreboard">
      <div>Player 1: {scores.player1}</div>
      <div>Player 2: {scores.player2}</div>
      <div>Current Player: {currentPlayer}</div>
    </div>
  );
};

export default Scoreboard; 