import React from 'react';
import { Accordion } from 'react-bootstrap';
import './Express.css';
import b2b from '../Assets/Rectangle 72 (1).png'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Freaquently from '../components/Freaquently';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Ccard from './Ccard';

function B2b() {
  return (
    <div>
      <Header></Header>
      <div className='container p-3'>
        <div className='row'>
          <div className='col-md-6'>
            <h1><b>B2B Shipping</b></h1>
            <p className='p-2 pp33'>Our Express Delivery Service at Mr. Go. Experience the pinnacle of convenience with our lightning-fast service that ensures your packages reach their destination in record time.</p>

            <div className='features-container b2bc  p-3'>
              <div className='feature'>
                <h3 style={{ fontSize: "20px" }}><i style={{ color: "blueviolet" }} className="fa-solid fa-truck"></i> Speed Delivery</h3>
                <p className='w-100'>Swift and efficient service for time-sensitive shipments</p>
              </div>

              <div className='feature'>
                <h3 style={{ fontSize: "20px" }}><i style={{ color: "blueviolet" }} className="fa-solid fa-file-shield"></i> Secure Handling</h3>
                <p className='w-100'>Your packages are handled with utmost care and security</p>
              </div>

              <div className='feature'>
                <h3 style={{ fontSize: "20px" }}><i style={{ color: "blueviolet" }} className="fa-solid fa-map-location-dot"></i> Real-Time Tracking</h3>
                <p className='w-100'>Stay informed with live updates on your package's journey</p>
              </div>

              <div className='feature'>
                <h3 style={{ fontSize: "20px" }}><i style={{ color: "blueviolet" }} className="fa-solid fa-user-shield"></i> Reliability</h3>
                <p className='w-100'>Trust us for prompt and dependable deliveries, every time</p>
              </div>
            </div>

            <Link to={"/shipping"}>
              <button className='btn btn-primary ms-2'><b>Start Shipping</b> <i className="fa-solid fa-arrow-right fa-beat-fade ms-2"></i></button>

            </Link>                    </div>
          <div className='col-md-6'>
            <img style={{ marginLeft: "-22px" }} className='img expi' src={b2b} alt="Your Image"/>
          </div>
        </div>
      </div>

      <Ccard></Ccard>
      <Freaquently></Freaquently>
      <Footer></Footer>
    </div>
  );
}

export default B2b;
