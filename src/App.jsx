import Game from "./components/Game";
import Landing from "./components/Landing";
import { useState } from "react";

function App() {
  const [showGame, setShowGame] = useState(false);

  function startGame() {
    setShowGame(true); 
  }

  return (
    <>
      {showGame ? (
        <div className="quiz-container">
          < Game />
        </div>
      ) : (
        <div className="landing-container">
          <Landing onStartGame={startGame} />
        </div>
      )}

    </>
  );
}

export default App;