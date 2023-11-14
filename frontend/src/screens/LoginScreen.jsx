import FormContainer from "../components/FormContainer";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "../slice/usersApiSlice";
import { setCredentials } from "../slice/authSlice";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get("redirect") || "/";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res.error) {
        console.log("here");
        toast.error(res.error.data.message || res.error);
      } else dispatch(setCredentials({ ...res.data }));
    } catch (error) {
      console.log("error!");
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mt-2"
            disabled={isLoading}
          >
            Sign in
          </Button>
          {isLoading && <Loader />}
        </Form>

        <Row>
          <Col>
            New Customer?<Link to="/register"> Register here</Link>
          </Col>
        </Row>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default LoginScreen;
