import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.module.css";

const QuizList = () => {
  const [quizData, setQuizData] = useState();

  useEffect(() => {
    fetch(
      "https://react-quiz-91022-default-rtdb.europe-west1.firebasedatabase.app/quizlist.json"
    )
      .then((res) => res.json())
      .then((res) => {
        const quizList = [];
        Object.keys(res).forEach((key, i) => {
          quizList.push({
            id: key,
            name: `Test #${i + 1}`,
          });
        });
        setQuizData(quizList);
      });
  }, []);

  const renderQuizList = () => {
    return quizData?.map((quiz, i) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>Quiz {quiz.name}</NavLink>
        </li>
      );
    });
  };

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Quiz list</h1>

        <ul>{renderQuizList()}</ul>
      </div>
    </div>
  );
};

export default QuizList;
