import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";

import classes from "./Quiz.module.css";
import Constants from "../constants";

const Quiz = () => {
  // hooks:On
  const [quizData, setQuizData] = useState();
  const [loading, setLoading] = useState(true);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [results, setResults] = useState({});

  const { id } = useParams();
  const dbUrl = `${Constants.dbUrl}/${id}.json`;

  useEffect(() => {
    fetch(dbUrl)
      .then((res) => res.json())
      .then((res) => {
        setQuizData(res);
        setLoading(false);
      });
  }, []);
  // hooks:Off

  const updateQuestion = () => {
    const isQuizFinished = activeQuestionNumber + 1 === quizData.length;
    if (isQuizFinished) {
      setIsQuizFinished(true);
    } else {
      setActiveQuestionNumber((prevNumber) => prevNumber + 1);
    }
    setAnswerState(null);
  };

  const checkAnswer = (question, answerId) => {
    let currentResult = {};
    let currentAnswerState = {};
    let isResultAlreadySaved = results[question.id];
    const updateCurrentData = (key, data) => ({ [key]: data });

    if (question.rightAnswerId === answerId) {
      if (!isResultAlreadySaved) {
        currentResult = updateCurrentData(question.id, "success");
      }
      currentAnswerState = updateCurrentData(answerId, "success");
      const timeout = setTimeout(() => {
        updateQuestion();
        clearTimeout(timeout);
      }, Constants.questionDelay);
    } else {
      if (!isResultAlreadySaved) {
        currentResult = updateCurrentData(question.id, "error");
      }
      currentAnswerState = updateCurrentData(answerId, "error");
    }

    if (currentResult[question.id]) {
      setResults((prevRes) => ({ ...prevRes, ...currentResult }));
    }
    setAnswerState(currentAnswerState);
  };

  // handlers:On
  const onAnswerClickHandler = (answerId) => {
    if (answerState && Object.values(answerState)[0] === "success") {
      return;
    }

    const question = quizData[activeQuestionNumber];
    checkAnswer(question, answerId);
  };

  const retryHandler = () => {
    setActiveQuestionNumber(0);
    setAnswerState(null);
    setIsQuizFinished(false);
    setResults({});
  };
  // handlers:Off

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Quiz page</h1>

        {isQuizFinished ? (
          <FinishedQuiz
            results={results}
            quiz={quizData}
            onRetry={retryHandler}
          />
        ) : (
          <>
            {loading ? (
              <Loader />
            ) : (
              <ActiveQuiz
                answers={quizData[activeQuestionNumber].answers}
                question={quizData[activeQuestionNumber].question}
                quizLength={quizData.length}
                questionNumber={activeQuestionNumber + 1}
                state={answerState}
                onAnswerClick={onAnswerClickHandler}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
