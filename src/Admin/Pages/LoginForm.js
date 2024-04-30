import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom
import { adminlogin } from "../../service/allApi";
import { toast } from 'react-toast';

const withLoginFormBackground = (WrappedComponent) => {
  return () => (
    <div style={{ backgroundImage: "url('https://i.postimg.cc/jSZRnkf5/5166950.jpg')", minHeight: '100vh', padding: '20px' }}>
      <WrappedComponent />
    </div>
  );
};

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

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
      const response = await adminlogin(formData);
      const { token } = response.data;
      const {id}=response.data;
      if(id){
        localStorage.setItem('id',id)
        localStorage.setItem('adminToken',token)
        setError('');
        navigate('/admin');
        toast.success('Login successful');
      } else {
        setError('Login failed');
        toast.error('Login failed');    
      }
      
      if (token) {
        localStorage.setItem('token', token);
        setError('');
        navigate('/admin');
        toast.success('Login successful');
      } else {
        setError('Login failed');
        toast.error('Login failed');
      }
    } catch (error) {
      setError('Login failed');
      toast.error('Login failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: 'rgba(200, 185, 205, 0.7)' }}> {/* Set background color with transparency */}
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Admin Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle password visibility
                      className="form-control"
                      placeholder="Password"
                      name='password'
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      className="btn btn-secondary" 
                      type="button" 
                      onClick={togglePasswordVisibility}
                    >
                      {/* Eye icon for toggling password visibility */}
                      <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                    </button>
                  </div>
                </div>
                <div className="text-center mt-3">
                    <button type="submit" className="btn btn-primary btn-block">
                      Login 
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLoginFormBackground(LoginForm);