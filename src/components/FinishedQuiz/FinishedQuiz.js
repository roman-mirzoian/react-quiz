import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from "./FinishedQuiz.module.css";

const FinishedQuiz = (props) => {
  const succesAmount = Object.values(props.results).reduce((total, value) => {
    if (value === "success") {
      total += 1;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((questionItem, i) => {
          const succesClass = `fa-check ${classes.success}`;
          const errorClass = `fa-times ${classes.error}`;
          const resultClass =
            props.results[questionItem.id] === "success"
              ? succesClass
              : errorClass;
          const cls = ["fas", resultClass];
          return (
            <li key={i}>
              <strong>{i + 1}.</strong>&nbsp;
              {questionItem.question}&nbsp;
              <i className={cls.join(" ")} />
            </li>
          );
        })}
      </ul>

      <p>
        Правильно {succesAmount} из {props.quiz.length}
      </p>

      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторить
        </Button>
        <Link to={"/"}>
          <Button onClick={props.onRetry} type="success">
            Перейти в список тестов
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
