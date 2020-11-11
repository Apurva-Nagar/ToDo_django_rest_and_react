import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class SignupForm extends Component {
  render() {
    return (
      <div>
        <h4>SIGN UP</h4>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>

          <Form.Text className="text-muted">
            Already Registered? <Link to="/">Login</Link>.
          </Form.Text>
        </Form>
      </div>
    );
  }
}

export default SignupForm;
