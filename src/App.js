import { React, useEffect, useReducer } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import ReadyScreen from "./components/ReadyScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
const initialState = {
  questions: [],
  appStatus: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReady":
      return { ...state, questions: action.payload, appStatus: "ready" };
    case "startedQuiz":
      return {
        ...state,
        appStatus: "active",
        secondsRemaining: state.questions.length * 30,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "answered":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "finishQuiz":
      return {
        ...state,
        appStatus: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        appStatus: "ready",
      };
    case "timer":
      return { ...state, secondsRemaining: state.secondsRemaining - 1 };
    default:
      throw new Error("Unknown Action");
  }
}
function App() {
  const [
    {
      questions,
      appStatus,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchQuestions() {
      const response = await fetch("http://localhost:8000/questions");
      const data = await response.json();
      dispatch({ type: "dataReady", payload: data });
    }
    fetchQuestions();
  }, []);

  const noOfQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  return (
    <div className="app">
      <div className="container">
        <Header />
        <Main>
          {appStatus === "loading" && <Loader />}
          {appStatus === "error" && <Error />}
          {appStatus === "ready" && (
            <ReadyScreen noOfQuestions={noOfQuestions} dispatch={dispatch} />
          )}
          {appStatus === "active" && (
            <>
              <Progress
                index={index}
                noOfQuestions={noOfQuestions}
                answer={answer}
                maxPoints={maxPoints}
                points={points}
              />
              <Question
                question={questions[index]}
                answer={answer}
                dispatch={dispatch}
              />
              <Footer>
                <Timer
                  dispatch={dispatch}
                  secondsRemaining={secondsRemaining}
                />
                {answer >= 0 && (
                  <NextQuestion
                    dispatch={dispatch}
                    index={index}
                    noOfQuestions={noOfQuestions}
                    answer={answer}
                  />
                )}
              </Footer>
            </>
          )}
          {appStatus === "finished" && (
            <FinishedScreen
              maxPoints={maxPoints}
              points={points}
              dispatch={dispatch}
              highscore={highscore}
            />
          )}
        </Main>
      </div>
    </div>
  );
}

export default App;
