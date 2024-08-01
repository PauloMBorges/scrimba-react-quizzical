import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function Questions( { count }) {
  const [questions, setQuestions] = useState([]);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("https://opentdb.com/api.php?amount=5");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.results) {
          setQuestions(data.results);
          const shuffled = data.results.map((question) => ({
            ...question,
            answers: shuffleArray([
              ...question.incorrect_answers,
              question.correct_answer,
            ]),
          }));
          setShuffledQuestions(shuffled);
        } else {
          setError("No questions found");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [count]);

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  function handleSelectedAnswer(questionIndex, answer) {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  }

  function checkAnswers() {
    const correctAnswers = shuffledQuestions.map(
      (question) => question.correct_answer
    );
    const userAnswers = Object.values(selectedAnswers);
    const score = userAnswers.reduce(
      (acc, answer, index) =>
        answer === correctAnswers[index] ? acc + 1 : acc,
      0
    );
    alert(`You got ${score} out of ${questions.length} correct!`);
  }

  return (
    <div className="questions-container">
      {shuffledQuestions.map((question, index) => (
        <div key={uuidv4()} className="question">
          <h2>{decodeHtml(question.question)}</h2>
          <div className="answers">
            {question.answers.map((answer) => (
              <button
                key={uuidv4()}
                className={`answer-btn ${
                  selectedAnswers[index] === answer ? "selected" : ""
                }`}
                onClick={() => handleSelectedAnswer(index, answer)}
              >
                {decodeHtml(answer)}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={checkAnswers}>Check Answers</button>
    </div>
  );
}

// Utility function to decode HTML entities
function decodeHtml(html) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = html;
  return textArea.value;
}

// Utility function to shuffle an array
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default Questions;
