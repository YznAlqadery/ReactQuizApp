import React from "react";
import StartQuiz from "./StartQuiz";

export default function ReadyScreen({ noOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{noOfQuestions} questions to test your React Mastery!</h3>
      <StartQuiz dispatch={dispatch} />
    </div>
  );
}
