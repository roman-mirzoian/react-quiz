import React, { useState } from "react";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import classes from "./Quiz.module.css";

const defaultQuiz = [
  {
    id: 1,
    question: "Какого цвета небо?",
    rightAnswerId: 2,
    answers: [
      { text: "Черный", id: 1 },
      { text: "Синий", id: 2 },
      { text: "Красный", id: 3 },
      { text: "Зелёный", id: 4 },
    ],
  },
  {
    id: 2,
    question: "Какой сейчас год?",
    rightAnswerId: 3,
    answers: [
      { text: "2222", id: 1 },
      { text: "2020", id: 2 },
      { text: "2022", id: 3 },
      { text: "0002", id: 4 },
    ],
  },
];
const questionDelay = 1000;

const Quiz = () => {
  const [quizData, setQuizData] = useState(defaultQuiz);
  const [activeQuestionNumber, setActiveQuestionNumber] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isQuizFinished, setIsQuizFinished] = useState(true);

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
    if (question.rightAnswerId === answerId) {
      setAnswerState({ [answerId]: "success" });
      const timeout = setTimeout(() => {
        updateQuestion();
        clearTimeout(timeout);
      }, questionDelay);
    } else {
      setAnswerState({ [answerId]: "error" });
    }
  };

  const onAnswerClickHandler = (answerId) => {
    if (answerState && Object.values(answerState)[0] === "success") {
      return;
    }

    const question = quizData[activeQuestionNumber];
    checkAnswer(question, answerId);
  };

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Quiz page</h1>

        {isQuizFinished ? (
          <FinishedQuiz />
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
      </div>
    </div>
  );
};

export default Quiz;
