import React, { useState } from 'react';
import './ContactUs.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import { contactus } from '../service/allApi';

function ContactUs() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Mobile: '',
    Message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactus(formData);
      // Show success toast message
      toast.success('Form submitted successfully', {
        onClose: () => window.location.reload(), // Refresh page when toast is closed
      });
    } catch (error) {
      // Show error toast message
      toast.error('Error submitting form');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="main">
        <div className="row">
          <div className="col formdiv">
            <div className="form-container ct">
              <h3 className="text-center">
                <b>Support</b>
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <b>Name</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <b>Email address</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    <b>Mobile Number</b>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">+91</span>
                    <input
                      type="text"
                      className="form-control"
                      id="Mobile"
                      name="Mobile"
                      value={formData.Mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    <b>Write Your Message</b>
                  </label>
                  <textarea
                    className="form-control"
                    id="Message"
                    rows="4"
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;