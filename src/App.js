import React from "react";
import "./App.css"; // Ensure global styles are applied
import Game from "./components/Game";
import Scoreboard from "./components/Scoreboard";
import GameControls from "./components/GameControls";

function App() {
  return (
    <div className="App">
      <h1>Flip Card Match Game</h1>
      <Game />
    </div>
  );
}

export default App;
