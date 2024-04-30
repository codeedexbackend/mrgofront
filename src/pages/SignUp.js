import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerApi } from "../service/allApi";
import { toast } from "react-toast";

const SignUp = () => {
  const navigate = useNavigate();
  // state to store inputs
  const [user, setUser] = useState({
    full_name: "",
    email: "",
    mobile: "",
    password: "",
    password2: "",
  });
  // state to check validation
  const [unameValid, setUnameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [pswValid, setPswValid] = useState(false);
  const [cpswValid, setcPswValid] = useState(false);
  const [MValid, setMValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const setInputs = (e) => {
    const { name, value } = e.target;
    if (name == "full_name") {
      if (value.match(/^[a-zA-Z ]+$/)) {
        setUnameValid(false);
      } else {
        setUnameValid(true);
      }
    }

    if (name == "email") {
      if (
        value.match(
          /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        )
      ) {
        setEmailValid(false);
      } else {
        setEmailValid(true);
      }
    }
    if (name === "mobile") {
      if (value.match(/^[0-9]{10}$/)) {
        setMValid(false);
      } else {
        setMValid(true);
      }
    }
    
    if (name == "password") {
      if (value.match(/^[0-9a-zA-Z@]{3,8}$/)) {
        setPswValid(false);
      } else {
        setPswValid(true);
      }
    }
    if (name == "password2") {
      if (value.match(/^[0-9a-zA-Z@]{3,8}$/)) {
        setcPswValid(false);
      } else {
        setcPswValid(true);
      }
    }

    setUser({ ...user, [name]: value });
  };
  console.log(user);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { full_name, email, mobile, password, password2 } = user;
      if (!full_name || !email || !mobile || !password || !password2) {
        throw new Error('Please fill all data');
      }
      if (password !== password2) {
        setPasswordMatch(false);
        return; // Stop execution if passwords do not match
      }
      // Reset password match state if passwords match
      setPasswordMatch(true);
  
      const result = await registerApi(user);
      if (result.status === 201) {
        // Store only the authentication token in local storage
        localStorage.setItem('id', result.data.user_id);
        localStorage.setItem('full_name', result.data.full_name); // Store full name
        toast.success(`${result.data.full_name} Account created successfully`);
        setUser({ full_name: "", email: "", password: "" });
        navigate('/Profile');
      } else {
        throw new Error('Unexpected error occurred');
      }
    } catch (error) {
      toast.error(error.message || 'Error occurred while registering');
      console.error('Registration failed:', error);
    }
  };
  

  return (
    <div className="main-div">
      <div className="container py-5">
        <Row>
          <Col lg={6} className="my-5">
            <div className="imagediv">
              <h1 className="mrgo" style={{ color: "red" }}>
                <b>Mr.Go</b>
              </h1>
              <h2 className="welcome">
                <b>Connecting distances,</b>
              </h2>
              <h2 className="welcome">
                <b>delivering smiles.</b>
              </h2>
              <h2 className="welcome">
                <b>Our courier service goes</b>
              </h2>
              <h2 className="welcome">
                <b>beyond packages</b>
              </h2>
              <br />
              <p className="welcome">
                <b>Our Partners</b>
              </p>
              <img
                className="partners"
                src="https://i.postimg.cc/k5YPRjxD/Rectangle-60.png"
                alt=""
              />{" "}
              <img
                className="partners1"
                src="https://i.postimg.cc/8C9nVxRd/Rectangle-61.png"
                alt=""
              />
              <img
                className="image12 "
                id="imggv"
                src="https://i.postimg.cc/HLGXfySY/sign-removebg-preview.png"
                alt=""
              />
            </div>
          </Col>
          <Col lg={6} className="p-5 text-white my-5" id="d1">
            <div className="signupdiv">
              <h4
                style={{ fontSize: "18px", paddingTop: "30px" }}
                className="text-center  text-black "
              >
                Get Started With a Free Account
              </h4>
              <button
                className="btn btn-outline-dark container w-75 kiu"
                style={{ marginLeft: "13%" }}
              >
                {" "}
                <img
                  style={{ height: "25px", width: "25px", marginTop: "-8px" }}
                  src="https://i.postimg.cc/nV59n3V9/download-removebg-preview.png"
                  alt=""
                />{" "}
                <b style={{ marginTop: "10px" }}>Google</b>{" "}
              </button>
              <p
                className="text-black container w-75 mt-3"
                style={{ textAlign: "center" }}
              >
                OR
              </p>
              <Form>
                <Form.Group
                  value={user.full_name}
                  onChange={(e) => setInputs(e)}
                  className=""
                  controlId="UerName"
                >
                  <Form.Label className="text-dark formm">Full Name</Form.Label>
                  <Form.Control
                    className={`container w-75 ${
                      unameValid ? "is-invalid" : ""
                    }`}
                    type="text"
                    name="full_name"
                  />
                  {unameValid && (
                    <div className="invalid-feedback">
                      Please enter a valid full name
                    </div>
                  )}
                </Form.Group>
                <Form.Group
                  value={user.email}
                  onChange={(e) => setInputs(e)}
                  className=""
                  controlId="email"
                >
                  <Form.Label className="text-dark formm">
                    Email address
                  </Form.Label>
                  <Form.Control
                    className={`container w-75 ${
                      emailValid ? "is-invalid" : ""
                    }`}
                    type="email"
                    name="email"
                  />
                  {emailValid && (
                    <div className="invalid-feedback">
                      Please enter a valid email address
                    </div>
                  )}
                </Form.Group>
                <Form.Group
                  value={user.mobile}
                  onChange={(e) => setInputs(e)}
                  className=""
                  controlId="mobile"
                >
                  <Form.Label className="text-dark formm">
                    Mobile number
                  </Form.Label>
                  <Form.Control
                    className={`container w-75 ${MValid ? "is-invalid" : ""}`}
                    type="number"
                    name="mobile"
                  />
                  {MValid && (
                    <div className="invalid-feedback">
                      Please enter a valid mobile number
                    </div>
                  )}
                </Form.Group>
                <Form.Group
                  value={user.password}
                  onChange={(e) => setInputs(e)}
                  className=""
                  controlId="password"
                >
                  <Form.Label className="text-dark formm">Password</Form.Label>
                  <Form.Control
                    className={`container w-75 ${pswValid ? "is-invalid" : ""}`}
                    type="password"
                    name="password"
                  />
                  {pswValid && (
                    <div className="invalid-feedback">
                      Password must be 3-8 characters long and contain only
                      letters, numbers, or '@'
                    </div>
                  )}
                </Form.Group>
                <Form.Group value={user.password2} onChange={(e)=>setInputs(e)} className="" controlId="password2">
  <Form.Label className="text-dark formm">Confirm Password</Form.Label>
  <Form.Control className={`container w-75 ${cpswValid ? 'is-invalid' : ''}`} type="password" name="password2" />
  {cpswValid && <div className="invalid-feedback">Password must be 3-8 characters long and contain only letters, numbers, or '@'</div>}
  {!passwordMatch && <div className="invalid-feedback">Passwords do not match</div>}
</Form.Group>

                <Form.Group controlId="termsCheckbox" className="mb-3">
                  <Form.Check
                    className="container  w-75 mt-3"
                    id="fcheck"
                    type="checkbox"
                  />{" "}
                  <p id="rd" className="text-black">
                    By clicking Sign up for Free, you agree to Mr. Go Terms Of
                    Service and Privacy Policy
                  </p>
                </Form.Group>
                <div className="mt-3 text-center my-5">
                  <Button
                    onClick={(e) => handleRegister(e)}
                    style={{ marginLeft: "10px", height: "38px" }}
                    className="container w-75"
                    variant="primary"
                    type="submit"
                  >
                    Sign Up For Free
                  </Button>
                </div>
                <p id="hiu" className="text-black container w-75">
                  Already have an account ? <Link to={"/login"}>Login</Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUp;
