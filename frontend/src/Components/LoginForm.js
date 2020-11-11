import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  render() {
    return (
      <div>
        <h4>LOGIN</h4>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>

          <Form.Text className="text-muted">
            Not Registered? <Link to="/signup">Sign up</Link>.
          </Form.Text>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
