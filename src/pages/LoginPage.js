import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import api from "../utils/api";

const LoginPage = ({user, setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      if(!email || !password) throw new Error('이메일과 비밀번호를 모두 입력해주세요.');
      const response = await api.post('/user/login', {email, password});
      if(response.status !== 200) throw new Error(response.message); 
        setError("");
        sessionStorage.setItem("token",response.data.token); 
        api.defaults.headers.authorization =`Bearer ${response.data.token}`;
        setUser(response.data.user);
        navigate('/'); 
    } catch(error) {
      setError(error.message);
      console.error(error);
    }
  }
  if(user){
    return <Navigate to="/" />
  } 
  return (
    <div className="display-center">
      {error && <div className="red-error">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  autoComplete="off" onChange={(e)=> setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  autoComplete="off" onChange={(e) => setPassword(e.target.value)}/>
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