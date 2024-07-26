import React from "react";

export default function Progress({
  index,
  noOfQuestions,
  answer,
  points,
  maxPoints,
}) {
  return (
    <div className="progress">
      <progress
        value={index + Number(answer !== null)}
        max={noOfQuestions}
        min={0}
      />
      <p>
        Question <strong>{index + 1}</strong> / {noOfQuestions}
      </p>
      <p>
        {points} / {maxPoints}
      </p>
    </div>
  );
}
