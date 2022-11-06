import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../../containers/Auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  return <Navigate to={"/"} />;
};

export default Logout;
