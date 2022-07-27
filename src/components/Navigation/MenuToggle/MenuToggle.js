import React from "react";
import classes from "./MenuToggle.module.css";

const MenuToggle = (props) => {
  const style = props.isOpen ? `fa-times ${classes.open}` : "fa-bars";
  const cls = [classes.MenuToggle, "fas", style];

  return <i className={cls.join(" ")} onClick={props.onToggle} />;
};

export default MenuToggle;
