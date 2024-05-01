import React from 'react';
import { Accordion } from 'react-bootstrap';
import './Express.css';
import ecom from '../Assets/Rectangle 72 (2).png'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Freaquently from '../components/Freaquently';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Ccard from './Ccard';

function Ecommerce() {
  return (
    <div>
      <Header></Header>
      <div className='container p-5'>
        <div className='row'>
          <div className='col-md-6 hu'>
            <h1><b>E-Commerce Shipping</b></h1>
            <p className='p-2 pp33 mpko'>Our Express Delivery Service at Mr. Go. Experience the pinnacle of convenience with our lightning-fast service that ensures your packages reach their destination in record time.</p>

            <div className='features-container zz p-3'>
              <div className='feature featured'>
                <h3 style={{ fontSize: "20px" }}><i style={{ color: "blueviolet" }} className="fa-solid fa-truck"></i> Speed Delivery</h3>
                <p id='cpi'>Swift and efficient service for time-sensitive shipments</p>
              </div>

              <div className='feature featured'>
                <h3 style={{ fontSize: "20px" }}><i style={{ color: "blueviolet" }} className="fa-solid fa-file-shield"></i> Secure Handling</h3>
                <p id='cpi'>Your packages are handled with utmost care and security</p>
              </div>

              <div className='feature featured'>
                <h3 style={{ fontSize: "20px" }}><i style={{ color: "blueviolet" }} className="fa-solid fa-map-location-dot"></i> Real-Time Tracking</h3>
                <p id='cpi'>Stay informed with live updates on your package's journey</p>
              </div>

              <div className='feature featured'>
                <h3 style={{ fontSize: "20px" }}><i style={{ color: "blueviolet" }} className="fa-solid fa-user-shield"></i> Reliability</h3>
                <p id='cpi'>Trust us for prompt and dependable deliveries, every time</p>
              </div>
            </div>

            <Link to={"/shipping"}>
              <button className='btn btn-primary'><b>Start Shipping</b> <i className="fa-solid fa-arrow-right fa-beat-fade ms-2"></i></button>

            </Link>                    </div>
          <div className='col-md-6'>
            <img className='img image123 expi' src={ecom} alt="ert" />
          </div>
        </div>
      </div>

      <Ccard></Ccard>
      
      <Freaquently></Freaquently>
      <Footer></Footer>
    </div>
  );
}

export default Ecommerce;
