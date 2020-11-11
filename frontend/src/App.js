import React from "react";
import "./Components/Todo.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingBase from "./Components/LandingBase";
import Todo from "./Components/Todo";

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Auth Component</Link>
          </li>
          <li>
            <Link to="/todo">Todo Component</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/">
            <LandingBase />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
        </Switch>
        <footer style={{ textAlign: "center" }}>
          <small>
            Copyright &#169; 2020 &nbsp;
            <a
              href="https://github.com/Apurva-Nagar"
              target="_blank"
              className="footerLink"
            >
              Apurva Nagar
            </a>
          </small>
        </footer>
      </div>
    </Router>
  );
};

export default App;
