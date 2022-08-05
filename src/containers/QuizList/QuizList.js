import React, { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.module.css";

const QuizList = () => {
  const renderQuizList = () => {
    return [1, 2, 4].map((quiz, i) => {
      return (
        <li key={i}>
          <NavLink to={`/quiz/${quiz}`}>Quiz {quiz}</NavLink>
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
