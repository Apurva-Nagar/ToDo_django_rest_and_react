import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LandingBase = () => {
  return (
    <Router>
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <div className="flex-wrapper">
              <div className="LandLogo" style={{ flex: 4 }}>
                <h2>TODO</h2>
              </div>
              <div style={{ flex: 4 }}>
                <Switch>
                  <Route exact path="/">
                    <LoginForm />
                  </Route>
                  <Route path="/signup">
                    <SignupForm />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default LandingBase;
