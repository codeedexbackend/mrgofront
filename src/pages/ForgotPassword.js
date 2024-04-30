import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css'; // Import your CSS file for styling if needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the logic for sending a password reset email
    // For example, you can call an API to send the reset email
    console.log('Send password reset email to:', email);
    // Optionally, show a success message to the user
  };

  return (
    <div className="main-div">
      <div className="container py-5">
        <Row>
          
          <div className=" text-white my-5" id="d1">
            <div className='forgetdiv'>
              <h4 style={{ fontSize: "18px", paddingTop: "30px" }} className="text-center text-black">Forgot Password</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control className='container w-75'
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className='mt-4 container w-25'>
                  Reset Password
                </Button>
              </Form>
              <p className='text-black container w-75 mt-3' style={{ textAlign: 'center' }}>Remember your password? <Link to="/login">Login</Link></p>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
