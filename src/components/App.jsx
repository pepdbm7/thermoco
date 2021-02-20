import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { theme } from "../theme";
import { getToken } from "../redux/auth/authSlice";
import { ThemeProvider } from "@material-ui/core/styles";

//layout components:
import { Navbar } from "./layout";

//page components:
import HomePage from "./Home/HomePage";
import LoginPage from "./Login/LoginPage";
import ErrorPage from "./Error";

function App() {
  const token = useSelector(getToken);

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (token) setIsAuthorized(true);
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          {isAuthorized ? (
            <Route>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/home" component={HomePage} />
                  <Route>
                    <ErrorPage />
                  </Route>
                </Switch>
              </div>
            </Route>
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
