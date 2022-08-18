import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { fetchQuizList } from "./quizListSlice";

import Loader from "../../components/UI/Loader/Loader";
import classes from "./QuizList.module.css";

const QuizList = () => {
  const { quizData, loading, error } = useSelector((state) => state.quizList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizList());
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
        {error && <div>{error}</div>}
        {loading ? <Loader /> : <ul>{renderQuizList()}</ul>}
      </div>
    </div>
  );
};

export default QuizList;
