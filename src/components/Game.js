import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./Game.css";

const Game = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isVictory, setIsVictory] = useState(false);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const initializeGame = () => {
    const symbols = ["A", "B", "C", "D"];
    const deck = [...symbols, ...symbols, ...symbols, ...symbols];
    shuffle(deck);
    setCards(
      deck.map((symbol, index) => ({ id: index, symbol, isFlipped: false }))
    );
    setFlippedCards([]);
    setMatchedCards([]);
    setScores({ player1: 0, player2: 0 });
    setCurrentPlayer(1);
    setIsVictory(false);
    setMoves(0);
    setTimer(0);
    setIsRunning(true);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (matchedCards.length === cards.length) {
      setIsVictory(true);
      setIsRunning(false);
    }
  }, [matchedCards, cards.length]);

  const handleCardClick = (id) => {
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      const newFlippedCards = [...flippedCards, id];
      setFlippedCards(newFlippedCards);
      setMoves((prevMoves) => prevMoves + 1);

      if (newFlippedCards.length === 2) {
        const [firstCard, secondCard] = newFlippedCards.map(
          (index) => cards[index]
        );
        if (firstCard.symbol === secondCard.symbol) {
          setScores((prevScores) => ({
            ...prevScores,
            [`player${currentPlayer}`]: prevScores[`player${currentPlayer}`] + 1,
          }));
          setMatchedCards((prevMatched) => [
            ...prevMatched,
            firstCard.id,
            secondCard.id,
          ]);
          setFlippedCards([]);
        } else {
          setTimeout(() => {
            setCards((prevCards) =>
              prevCards.map((card) =>
                newFlippedCards.includes(card.id)
                  ? { ...card, isFlipped: false }
                  : card
              )
            );
            setFlippedCards([]);
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="game">
      <div className="scoreboard">
        <div>Player 1: {scores.player1}</div>
        <div>Player 2: {scores.player2}</div>
        <div className="current-player">Current Player: {currentPlayer}</div>
        <div>Moves: {moves}</div>
        <div>Time: {timer}s</div>
      </div>
      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            symbol={card.symbol}
            isFlipped={card.isFlipped || flippedCards.includes(card.id)}
            isMatched={matchedCards.includes(card.id)}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {isVictory && (
        <div className="victory-popup">
          <h2>Victory!</h2>
          <button className="restart-button" onClick={initializeGame}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
