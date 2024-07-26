import React from "react";

export default function NextQuestion({
  dispatch,
  answer,
  index,
  noOfQuestions,
}) {
  if (answer === null) return;
  if (index < noOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === noOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finish
      </button>
    );
}
