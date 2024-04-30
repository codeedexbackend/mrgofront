// ContactDetails.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './contactdetails.css';
import AHeader from './AHeader';
import { FaEnvelope, FaPhone, FaUser, FaComment } from 'react-icons/fa';

function ContactDetails() {
  // Get the contact data from the location state
  const location = useLocation();
  const { contact } = location.state;

  return (
    <div>
      <AHeader />
      <div className="contact-details-container">
        <div className="contact-details-background">
          <div className="contact-detail-item">
            <FaUser className="contact-icon" />
            <span className="contact-detail-label">Name:</span> {contact.Name}
          </div>
          <div className="contact-detail-item">
            <FaEnvelope className="contact-icon" />
            <span className="contact-detail-label">Email:</span> {contact.Email}
          </div>
          <div className="contact-detail-item">
            <FaPhone className="contact-icon" />
            <span className="contact-detail-label">Mobile:</span> {contact.Mobile}
          </div>
          <div className="contact-detail-item">
            <FaComment className="contact-icon" />
            <span className="contact-detail-label">Message:</span> {contact.Message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
