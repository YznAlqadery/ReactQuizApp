import React from "react";

export default function FinishedScreen({
  maxPoints,
  points,
  dispatch,
  highscore,
}) {
  return (
    <>
      <p className="result">
        You scored {points} out of {maxPoints}
      </p>
      <p className="highscore">Highscore: ({highscore})</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
