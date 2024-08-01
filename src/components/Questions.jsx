import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] =
    useState(
      0
    ); /* if the user wants to play again, increases the count (run useEffect again) */

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

  return (
    <div className="questions-container">
      {questions.map((question) => (
        <div key={uuidv4()} className="question">
          <h2>{decodeHtml(question.question)}</h2>
          <div className="answers">
            {shuffleArray([
              ...question.incorrect_answers,
              question.correct_answer,
            ]).map((answer) => (
              <button key={uuidv4()} className="answer-btn">
                {decodeHtml(answer)}
              </button>
            ))}
          </div>
        </div>
      ))}
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
