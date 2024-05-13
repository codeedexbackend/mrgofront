import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../service/allApi";
import { toast } from "react-toast";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import GoogleLogin from 'react-google-login';

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
  const [showPassword, setShowPassword] = useState(false);
  const clientId = "688916887748-jj5kt7q6g63l4os2vo1fcuefca0borid.apps.googleusercontent.com"; // Replace with your Google client ID

  // State variables to track if fields are empty
  const [nameEmpty, setNameEmpty] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [mobileEmpty, setMobileEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [confirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const setInputs = (e) => {
    const { name, value } = e.target;
    
    // Set corresponding state variable to track if field is empty
    switch (name) {
      case "full_name":
        setNameEmpty(value.trim() === "");
        break;
      case "email":
        setEmailEmpty(value.trim() === "");
        break;
      case "mobile":
        setMobileEmpty(value.trim() === "");
        break;
      case "password":
        setPasswordEmpty(value.trim() === "");
        break;
      case "password2":
        setConfirmPasswordEmpty(value.trim() === "");
        break;
      default:
        break;
    }

    // Other input validations...
    if (name === "full_name") {
      // Check if the value is not null or empty
      if (value.trim() !== "") {
        // Perform the regular expression check allowing all characters
        if (/^[\s\S]+$/.test(value)) { // Matches any character including newlines
          setUnameValid(false);
        } else {
          setUnameValid(true);
        }
      } else {
        // If the value is null or empty, mark as invalid
        setUnameValid(true);
      }
    }

    if (name === "email") {
      if (
        value.match(
          /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
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

    if (name === "password") {
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasUpperCase = /[A-Z]/.test(value);
      if (value.length >= 6 && hasSpecialChar && hasNumber && hasUpperCase) {
        setPswValid(false);
      } else {
        setPswValid(true);
      }
    }
    if (name === "password2") {
      if (value !== user.password) {
        setcPswValid(true);
      } else {
        setcPswValid(false);
      }
    }
    
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { full_name, email, mobile, password, password2 } = user;
      
      // Check if any field is empty
      if (!full_name || !email || !mobile || !password || !password2) {
        throw new Error("Please fill all data");
      }
      // Other validation checks...
      if (password !== password2) {
        setPasswordMatch(false);
        return; // Stop execution if passwords do not match
      }
      // Reset password match state if passwords match
      setPasswordMatch(true);

      const result = await registerApi(user);
      if (result.status === 201) {
        // Store only the authentication token in local storage
        localStorage.setItem("id", result.data.user_id);
        localStorage.setItem("full_name", result.data.full_name); // Store full name
        toast.success(`${result.data.full_name} Account created successfully`);
        setUser({ full_name: "", email: "", password: "" });
        navigate("/Profile");
      } else {
        throw new Error("Unexpected error occurred");
      }
    } catch (error) {
      toast.error("Error occurred while registering");
      console.error("Registration failed:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTermsCheckboxChange = () => {
    setTermsChecked(!termsChecked);
  };
  const handleGoogleSuccess = async (response) => {
    try {
      const { tokenId } = response;
      // Send the tokenId to your backend for verification and user authentication
      // Example: You can make an API call to your backend with the tokenId
      console.log("Google login success. Token ID:", tokenId);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
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
                <b>Our Services</b>
              </p>
              <img
                className="partners"
                src="https://i.postimg.cc/k5YPRjxD/Rectangle-60.png"
                alt="dfg"
              />{" "}
              <img
                className="partners1"
                src="https://i.postimg.cc/8C9nVxRd/Rectangle-61.png"
                alt="fdg"
              />
                <img
                className="partners"
                src="https://i.postimg.cc/sXCXp7Sk/logo.png"
                style={{width:'131px',height:'30px'}}
                alt="dfg"
              />{" "}
              <img
                className="partners1"
                src="https://i.postimg.cc/rwpQktd2/India-Post-LOGO.jpg"
                style={{width:'131px',height:'30px'}}

                alt="fdg"
              />
              <img
                className="image12 "
                id="imggv"
                src="https://i.postimg.cc/HLGXfySY/sign-removebg-preview.png"
                alt="dfg"
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
              <GoogleLogin
  className='w-75 google'
  clientId={clientId}
  buttonText="Login with Google"
  onSuccess={handleGoogleSuccess}
  onFailure={handleGoogleFailure}
  cookiePolicy={'single_host_origin'}
/>
              <p
                className="text-black container w-75 mt-3"
                style={{ textAlign: "center" }}
              >
                OR
              </p>
                <Form>
                <Form.Group controlId="UerName">
                  <Form.Label className="text-dark formm">Full Name</Form.Label>
                  <Form.Control
                    className={`container w-75 ${unameValid || nameEmpty ? "is-invalid" : ""}`}
                    type="text"
                    name="full_name"
                    onChange={(e) => setInputs(e)}
                    value={user.full_name}
                  />
                  {(unameValid || nameEmpty) && (
                    <div className="invalid-feedback">
                      {nameEmpty ? "This field is required" : "Please enter a valid full name"}
                    </div>
                  )}
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label className="text-dark formm">Email address</Form.Label>
                  <Form.Control
                    className={`container w-75 ${emailValid || emailEmpty ? "is-invalid" : ""}`}
                    type="email"
                    name="email"
                    onChange={(e) => setInputs(e)}
                    value={user.email}
                  />
                  {(emailValid || emailEmpty) && (
                    <div className="invalid-feedback">
                      {emailEmpty ? "This field is required" : "Please enter a valid email address"}
                    </div>
                  )}
                </Form.Group>
                <Form.Group
                 
                  controlId="mobile"
                >
                  <Form.Label className="text-dark formm">Mobile number</Form.Label>
<Form.Control
className={`container w-75 ${MValid || mobileEmpty ? "is-invalid" : ""}`}
type="number"
name="mobile"
onChange={(e) => setInputs(e)}
value={user.mobile}
/>
{(MValid || mobileEmpty) && (
<div className="invalid-feedback">
{mobileEmpty ? "This field is required" : "Please enter a valid mobile number"}
</div>
)}
                  
                </Form.Group>
                <Form.Group controlId="password">
<Form.Label className="text-dark formm">Password</Form.Label>
<InputGroup style={{width:'80%'}} className={`container ${pswValid || passwordEmpty ? "is-invalid" : ""}`}>
<Form.Control
type={showPassword ? "text" : "password"}
name="password"
value={user.password}
onChange={(e) => setInputs(e)}
/>
<InputGroup.Text onClick={togglePasswordVisibility}>
{showPassword ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
</InputGroup.Text>
</InputGroup>
{(pswValid || passwordEmpty) && (
<div className="invalid-feedback w-75">
{passwordEmpty ? "This field is required" : "Password must be at least 6 characters long and contain at least one special character, one number, and one uppercase letter."}
</div>
)}
</Form.Group>
<Form.Group controlId="password2">
<Form.Label className="text-dark formm">Confirm Password</Form.Label>
<Form.Control
className={`container w-75 ${cpswValid || confirmPasswordEmpty ? "is-invalid" : ""}`}
type="password"
name="password2"
onChange={(e) => setInputs(e)}
value={user.password2}
/>
{(cpswValid || confirmPasswordEmpty) && (
<div className="invalid-feedback">
{confirmPasswordEmpty ? "This field is required" : "Passwords do not match"}
</div>
)}
{!passwordMatch && (
<div className="invalid-feedback">
Passwords do not match
</div>
)}
</Form.Group>

<Form.Group controlId="termsCheckbox" className="mb-3">
              <Form.Check
                className="container w-75 mt-3"
                id="fcheck"
                type="checkbox"
                onChange={handleTermsCheckboxChange}

              />
              <p id="rd" className="text-black">
                By clicking Sign up for Free, you agree to Mr. Go Terms Of
                Service and Privacy Policy
              </p>
              {!termsChecked && (
                    <p style={{ color: "red", marginTop: "10px" ,marginLeft:'12%'}}>You must agree to the terms</p>
                  )}
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
