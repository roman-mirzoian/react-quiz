import React from "react";
import classes from "./Input.module.css";

function checkInput({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = (props) => {
  const inputType = props.type || "text";
  const inputErrorMessage = props.errorMessage || "Write correct value";
  const cls = [classes.Input];
  const inputId = `${inputType}-${Math.random()}`;

  const isInvalid = checkInput(props);

  if (isInvalid) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={inputId}>{props.label}</label>
      <input
        type={inputType}
        id={inputId}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid && <span>{inputErrorMessage}</span>}
    </div>
  );
};

export default Input;
