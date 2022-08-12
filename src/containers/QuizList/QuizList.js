import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import classes from "./QuizList.module.css";
import Constants from "../constants";

const dbUrl = `${Constants.dbUrl}.json`;

const QuizList = () => {
  const [quizData, setQuizData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(dbUrl)
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
        setLoading(false);
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
        {loading ? <Loader /> : <ul>{renderQuizList()}</ul>}
      </div>
    </div>
  );
};

export default QuizList;
