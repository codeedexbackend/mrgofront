import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import './Forgot.css'; // Create a CSS file for styling
import { otpsend } from '../service/allApi';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
const Forgot = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await otpsend({ email });
      if (response.status === 200) {
        setSubmitted(true);
        setError('');
        // Redirect to the OTP enter form page with email as a query parameter
        navigate(`/otp?email=${encodeURIComponent(email)}`);
      } else {
        setError('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP');
    }
  };
  return (
    <div className="form-gap">
      <div className="form-container">
        <div className="row">
          <div className="">
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="text-center">
                  <h3><i className="fa fa-lock fa-4x"></i></h3>
                  <h2 className="text-center">Forgot Password?</h2>
                  <p>You can reset your password here.</p>
                  <div className="panel-body">
                    <form onSubmit={handleSubmit} role="form" autoComplete="off" className="form" method="post">
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                          <input id="email" name="email" placeholder="email address" className="form-control" value={email} onChange={handleChange} type="email" required />
                        </div>
                      </div>
                      <div className="form-group">
                        <Button type="submit" name="recover-submit" className="btn btn-lg btn-primary btn-block">Reset Password</Button>
                      </div>
                      {error && <div className="text-danger">{error}</div>}
                      {submitted && <div className="text-success">OTP sent successfully!</div>}
                      <input type="hidden" className="hide" name="token" id="token" value="" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Forgot;