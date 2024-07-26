import React from "react";

export default function StartQuiz({ dispatch }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "startedQuiz" })}
    >
      Start
    </button>
  );
}
