import React, { useState } from "react";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenuHandler = () => {
    setMenuIsOpen((prevState) => !prevState);
  };

  return (
    <div className={classes.Layout}>
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menuIsOpen} />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
