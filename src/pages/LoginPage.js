import React from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div className="display-center">
      <Form className="login-box">
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;