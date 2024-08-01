import React, { useState } from "react";
import Questions from "./Questions";

function Game() {
  const [count, setCount] = useState(0);

  function handlePlayAgain() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="game">
      <h1>Game</h1>
      <Questions key={count} count={count} />
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
}

export default Game;
