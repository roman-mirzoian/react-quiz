import React from "react";
import AnswerItem from "./AnswerItem/AnswerItem";
import classes from "./AnswersList.module.css";

const AnswersList = (props) => {
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, index) => {
        const answerState = props.state ? props.state[answer.id] : null;
        return (
          <AnswerItem
            key={index}
            answer={answer}
            state={answerState}
            onAnswerClick={props.onAnswerClick}
          />
        );
      })}
    </ul>
  );
};

export default AnswersList;
