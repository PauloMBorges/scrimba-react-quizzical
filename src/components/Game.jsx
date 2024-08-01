import React, { useState } from "react";
import Questions from "./Questions";

function Game() {
  const [count, setCount] = useState(0);

  function handlePlayAgain() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="game">
      <Questions key={count} onPlayAgain={handlePlayAgain} count={count} />
    </div>
  );
}

export default Game;
