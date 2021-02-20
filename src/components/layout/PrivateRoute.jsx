import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ component, path = "", exact = false }) {
  const isAuthenticated = useSelector((state) => state.auth.token);

  if (isAuthenticated) {
    return <Route exact={exact || false} path={path} component={component} />;
  } else {
    return <Redirect to="/login" />;
  }
}
