import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi } from '../service/allApi';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if user is already logged in
  if (localStorage.getItem('token')) {
    navigate('/'); // Redirect to homepage if user is already logged in
    return null; // Render nothing else
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (!email || !password) {
        setError('Please enter both email and password');
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }

      const response = await loginApi(formData);

      if (response && response.data) {
        const { token, id } = response.data;

        if (id) {
          localStorage.setItem('id', id);
          setError('');
          navigate('/');
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login successful",
            showConfirmButton: false,
            timer: 1500
          });
        }

        if (token) {
          localStorage.setItem('id', id);
          setError('');
          navigate('/');
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Login successful",
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {
        setError('Login failed');
        toast.error('Login failed');
        // Handle other cases where response or response data is missing
      }
    } catch (error) {
      setError('Login failed');
      toast.error('Login failed');
      // Handle other errors, such as network errors
    }
  };

  return (
    <div className='main-div'>
      <div className="container py-5">
        <Row>
          <Col lg={6} className="my-5">
            <div className='imagediv'>
              <h1 className='mrgo' style={{ color: "red" }}><b>Mr.Go</b></h1>
              <h2 className='welcome'>Welcome Back !</h2>
              <img className="image1" src="https://i.postimg.cc/HLGXfySY/sign-removebg-preview.png" alt="" />
            </div>
          </Col>
          <Col lg={6} className="p-5 text-white my-5" id="d1">
            <div className='logindiv'>
              <h4 style={{ fontSize: "18px", paddingTop: "30px" }} className="text-center text-black">Get Started With a Free Account</h4>
              <button className='btn btn-outline-dark container w-75' id='odf'> <img style={{ height: "25px", width: "25px", marginTop: "-8px" }} src="https://i.postimg.cc/nV59n3V9/download-removebg-preview.png" alt="" /> <b style={{ marginTop: "10px" }}>Google</b> </button>
              <p className='text-black container w-75 mt-3' style={{ textAlign: 'center' }}>OR</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="" controlId="exampleInputEmail1">
                  <Form.Label className="text-dark formm">Email address</Form.Label>
                  <Form.Control className='container w-75' type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group className="" controlId="exampleInputPassword1">
                  <Form.Label className="text-dark formm">Password</Form.Label>
                  <Form.Control className='container w-75' type="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group controlId="termsCheckbox" className="mb-3">
                  <Form.Check className='container w-75 mt-3' id='fcheck' type="checkbox" required /> <p id='rd' className='text-black'>By clicking Sign up for Free, you agree to Mr. Go  Terms Of Service and Privacy Policy</p>
                </Form.Group>
                <div className="mt-3 text-center my-5">
                  <Button style={{ marginLeft: "10px", height: "35px" }} className='container w-75' variant="primary" type="submit">
                    Login
                  </Button>
                </div>
                
                <p id='hiu' className='text-black container w-75'>Don't have an account ? <Link to={'/signup'}>Signup</Link></p>
                <div className="forgot-password-link">
                <Link to="/forgot">Forgot Password?</Link>                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;
