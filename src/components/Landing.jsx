import blueBlob from "../assets/blob-blue.svg";
import yellowBlob from "../assets/blob-yellow.svg";

function Landing() {
  return (
    <div className="landing">
      <h1 className="landing-title">Quizzical</h1>
      <h2 className="landing-description">Test your knowledge! Ready?</h2>
      <button className="start-quiz-btn">Start quiz</button>
      <img src={blueBlob} alt="blue blob" className="blob blue-blob"/>
        <img src={yellowBlob} alt="yellow blob" className="blob yellow-blob"/>
    </div>
  );
}

export default Landing;
