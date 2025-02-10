import React, { useState } from "react";
import "./Card.css";

const Card = ({ symbol, isFlipped, isMatched, onClick }) => {
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartY(touch.clientY);
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        console.log("Swipe Right");
        // Handle swipe right
      } else {
        console.log("Swipe Left");
        // Handle swipe left
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        console.log("Swipe Down");
        // Handle swipe down
      } else {
        console.log("Swipe Up");
        // Handle swipe up
      }
    }
  };

  return (
    <div
      className={`card ${isFlipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      }`}
      onClick={onClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="card-front">{symbol}</div>
      <div className="card-back">?</div>
    </div>
  );
};

export default Card;
