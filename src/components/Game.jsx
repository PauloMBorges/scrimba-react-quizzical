import React, { useState } from "react";
import Questions from "./Questions";
import blueBlob from "../assets/blob-blue.svg";
import yellowBlob from "../assets/blob-yellow.svg";

function Game() {
  const [count, setCount] = useState(0);

  function handlePlayAgain() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div className="game">
      <Questions key={count} onPlayAgain={handlePlayAgain} count={count} />
      <img src={blueBlob} alt="blue blob" className="blob blue-blob small" />
      <img src={yellowBlob} alt="yellow blob" className="blob yellow-blob small" />
    </div>
  );
}

export default Game;
