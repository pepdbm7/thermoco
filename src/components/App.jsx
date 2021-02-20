import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../theme";

//layout components:
import { Navbar, AuthRouter } from "./layout";

//page components:
import HomePage from "./Home/HomePage";
import LoginPage from "./Login/LoginPage";
import ErrorPage from "./Error";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route>
            <AuthRouter>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route>
                    <ErrorPage />
                  </Route>
                </Switch>
              </div>
            </AuthRouter>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
