import React from "react";
import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <>
      <h1>Something went wrong</h1>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => history.push("/")}
      >
        Go To Home Page
      </button>
    </>
  );
};

export default ErrorPage;
