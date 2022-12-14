import React from "react";
import classes from "./Select.module.css";

const Select = (props) => {
  const selectId = `${props.label} - ${Math.random()}`;

  return (
    <div className={classes.Select}>
      <label htmlFor={selectId}>{props.label}</label>
      <select id={selectId} value={props.value} onChange={props.onChange}>
        {props.options.map((option, i) => {
          return (
            <option value={option.value} key={i}>
              {option.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
