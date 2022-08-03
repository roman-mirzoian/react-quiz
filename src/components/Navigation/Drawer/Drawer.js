import React from "react";
import { NavLink } from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
import classes from "./Drawer.module.css";

const links = [
  { to: "/", label: "Quiz list", exact: "true" },
  { to: "/auth", label: "Auth", exact: "false" },
  { to: "/quiz-creator", label: "Quiz creator", exact: "false" },
];

const Drawer = (props) => {
  const style = props.isOpen ? "" : classes.close;
  const cls = [classes.Drawer, style];

  const setActiveLinkClassName = ({ isActive }) => {
    return isActive ? classes.active : undefined;
  };

  const clickHandler = () => {
    props.onClose();
  };

  const renderLinks = () =>
    links.map((link, i) => (
      <li key={i}>
        <NavLink
          to={link.to}
          exact={link.exact}
          className={setActiveLinkClassName}
          onClick={clickHandler}
        >
          {link.label}
        </NavLink>
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
