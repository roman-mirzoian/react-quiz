import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchQuiz,
  setAnswerState,
  setResults,
  updateQuestion,
  retryQuiz,
} from "./quizSlice";

import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";

import classes from "./Quiz.module.css";
import Constants from "../constants";

const Quiz = () => {
  // hooks:On
  const {
    loading,
    quizData,
    activeQuestionNumber,
    answerState,
    isQuizFinished,
    results,
  } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchQuiz(id)());
  }, []);
  // hooks:Off

  const checkAnswer = (question, answerId) => {
    let currentResult = {};
    let currentAnswerState = {};
    let isResultAlreadySaved = results[question.id];

    if (question.rightAnswerId === answerId) {
      if (!isResultAlreadySaved) {
        currentResult = updateCurrentAnswerData(question.id, Constants.success);
      }
      currentAnswerState = updateCurrentAnswerData(answerId, Constants.success);
      const timeout = setTimeout(() => {
        dispatch(updateQuestion());
        clearTimeout(timeout);
      }, Constants.questionDelay);
    } else {
      if (!isResultAlreadySaved) {
        currentResult = updateCurrentAnswerData(question.id, Constants.error);
      }
      currentAnswerState = updateCurrentAnswerData(answerId, Constants.error);
    }

    if (currentResult[question.id]) {
      dispatch(setResults(currentResult));
    }

    dispatch(setAnswerState(currentAnswerState));
  };

  // handlers:On
  const onAnswerClickHandler = (answerId) => {
    if (answerState && Object.values(answerState)[0] === Constants.success) {
      return;
    }

    const question = quizData[activeQuestionNumber];
    checkAnswer(question, answerId);
  };

  const retryHandler = () => {
    dispatch(retryQuiz());
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
                answers={quizData[activeQuestionNumber]?.answers}
                question={quizData[activeQuestionNumber]?.question}
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

function updateCurrentAnswerData(key, data) {
  return { [key]: data };
}

export default Quiz;
