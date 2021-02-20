import React from "react";
import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <div className="container p-4">
      <h2>Something went wrong</h2>
      <button
        className="btn btn-primary btn-lg"
        onClick={() => history.push("/home")}
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
