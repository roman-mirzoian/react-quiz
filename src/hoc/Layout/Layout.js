import React, { useState } from "react";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import classes from "./Layout.module.css";

const Layout = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenuHandler = () => {
    setMenuIsOpen((prevState) => !prevState);
  };

  const menuClosehandler = () => {
    setMenuIsOpen(false);
  };

  return (
    <div className={classes.Layout}>
      <Drawer isOpen={menuIsOpen} onClose={menuClosehandler} />
      <MenuToggle onToggle={toggleMenuHandler} isOpen={menuIsOpen} />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
