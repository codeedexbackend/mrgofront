import React, { useState } from 'react';
import './OTP.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { otpverification } from '../service/allApi';
function OTPVerification() {
    const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    // Extract email from URL query parameter
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const handleChange = (index, value) => {
        // Update the value of the OTP digit at the specified index
        const newOtpDigits = [...otpDigits];
        newOtpDigits[index] = value;
        setOtpDigits(newOtpDigits);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Join the OTP digits array into a single string
            const otpValue = otpDigits.join('');
            // Send OTP and email to backend service for verification
            const response = await otpverification({ otp: otpValue, email });
            console.log('OTP verification response:', response);
            // Redirect to password page upon successful verification
            navigate(`/new-password?email=${encodeURIComponent(email)}`);
        } catch (error) {
            setError('Failed to verify OTP');
        }
    };
    return (
        <div>
            <div className="containerm">
                <h2>OTP Verification</h2>
                <p className='text-center'>OTP sent to <b>{email}</b></p>
                <p className='text-center'>Please enter the OTP </p>
                <form onSubmit={handleSubmit} action="#">
                    <div className="otp-inputs">
                        {/* Map through each OTP digit and create an input field */}
                        {otpDigits.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                    <div className="resend">
                        <span>Didn't receive OTP? </span>
                        <Link to={'/forgot'}><a href="#">Resend OTP</a></Link>
                    </div>
                    <button type="submit">Verify</button>
                </form>
                {error && <div className="error">{error}</div>}
            </div>
        </div>
    );
}
export default OTPVerification;