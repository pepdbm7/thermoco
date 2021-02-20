import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export const AuthRouter = ({ children }) => {
  const authSelector = useSelector((state) => state.auth);
  let history = useHistory();

  if (authSelector.token && authSelector.token.length !== 0) {
    console.log("TOKEN", authSelector.token);
    return children;
  }

  history.push("/login");
  return <div />;
};
