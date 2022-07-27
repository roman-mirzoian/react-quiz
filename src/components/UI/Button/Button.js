import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const style = classes[props.type];
  const cls = [classes.Button, style];
  return (
    <>
      <button
        className={cls.join(" ")}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
