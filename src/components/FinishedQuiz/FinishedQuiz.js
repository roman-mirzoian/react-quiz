import React from "react";
import classes from "./FinishedQuiz.module.css";

const FinishedQuiz = (props) => {
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        <li>
          <strong>1.</strong>
          How are you?&nbsp;
          <i className={`fas fa-times ${classes.success}`}></i>
        </li>
        <li>
          <strong>1.</strong>
          How are you?&nbsp;
          <i className={`fas fa-check ${classes.error}`}></i>
        </li>
      </ul>

      <p>Правильно 4 из 10</p>

      <div>
        <button>Повторить</button>
      </div>
    </div>
  );
};

export default FinishedQuiz;
