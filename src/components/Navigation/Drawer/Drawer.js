import React from "react";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Drawer.module.css";

const links = [1, 2, 3];

const Drawer = (props) => {
  const style = props.isOpen ? "" : classes.close;
  const cls = [classes.Drawer, style];

  const renderLinks = () =>
    links.map((link, i) => (
      <li key={i}>
        <a href="/">Link {link}</a>
      </li>
    ));

  return (
    <>
      <nav className={cls.join(" ")}>
        <ul>{renderLinks()}</ul>
      </nav>
      {props.isOpen && <Backdrop onClick={props.onClose} />}
    </>
  );
};

export default Drawer;
