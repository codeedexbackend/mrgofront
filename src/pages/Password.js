import React, { useState } from 'react';
import './Password.css';
import { changepassword } from '../service/allApi'; // Import the API function
import { useLocation, useNavigate } from 'react-router-dom';
function Password() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    // Get the email from the URL query parameter
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if passwords match
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            // Call API to change password
            const response = await changepassword({
                email: email,
                new_password: password,
                confirm_new_password: confirmPassword
            });
            // Handle response
            console.log('Password change response:', response);
            navigate('/login')
            // Handle success
        } catch (error) {
            // Handle API errors
            console.error('Error changing password:', error);
            setError('Failed to change password');
        }
    };
    return (
        <div>
            <div className="containerb">
                <h2>New Password</h2>
                <p>Email: {email}</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {error && <div className="error">{error}</div>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default Password;