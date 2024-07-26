import React from "react";

export default function Option({ answer, dispatch, question }) {
  const isAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({ type: "answered", payload: index })}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            isAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={isAnswered}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
