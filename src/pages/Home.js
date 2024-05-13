import React, { useState, useEffect } from "react";
import { Link as Element } from "react-scroll";
import {  Button, Col, Form, Row } from "react-bootstrap";
import hr from "../Assets/Rectangle 112.png";

import Header from "../components/Header";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Footer from "../components/Footer";
import "./Home.css";
import Freaquently from "../components/Freaquently";
import { Link, useNavigate } from "react-router-dom";
import Track2 from "../components/Track2";

function Home() {
  const [tracking_id, setTrackingId] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login status
  const navigate = useNavigate();
  const [trackingIdError, setTrackingIdError] = useState('');
  const tokenExists = localStorage.getItem("id");
  const [formData, setFormData] = useState(null); // State to hold form data
  const [showTrack2, setShowTrack2] = useState(false); // State to manage Track2 component visibility

  
  const handleTrackOrder = (e) => {
    if (!tracking_id.trim()) {
      // If tracking ID is not filled
      setTrackingIdError('Tracking ID is required');
      e.preventDefault(); // Prevent navigation
    } else {
      // Proceed with tracking
      setShowAlert(false);
      setShowTrack2(true); // Show Track2 component
      localStorage.setItem("tracking_id", tracking_id);
    }
  };
  useEffect(() => { 
    window.scrollTo(0, 0);
    // Check if user is logged in
    if (localStorage.getItem('id')) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleGetStarted = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Navigate to the shipping page if the user is logged in
      navigate('/shipping');
    }
  };
  useEffect(() => {
    if (!tokenExists) {
      // If no token exists, set formData from localStorage
      const storedFormData = localStorage.getItem("formData");
      if (storedFormData) {
        setFormData(JSON.parse(storedFormData));
      }
    }
  }, [tokenExists]);
  
  return (
    <div>
      <Element name="home">
        <Header />
        {tokenExists ? null : (

        <div className="over">
          <Row className="b resp">
           
            <Col id="lokiok">
              <h1 className="hh ms-5">
                <span id="hhv">
                  <b>We Are Delivering Your</b>
                </span>{" "}
                <br />
                <span className="mb-4" id="hhh">
                  <b id="gt" className="text-start">
                    Promises On Time! 
                  </b>
                </span>
              </h1>
              <Row>
                <p  id="nj">
                  Mr. Go is your express delivery partner! With our commitment
                  to speed and exceptional service, we ensure your packages
                  reach their destination in record time. No more waiting –
                  choose Mr. Go for a seamless delivery experience.
                </p>
              </Row>
              <Row className="container w-50 resp">
                <Button
                  id="btt"
                  variant="primary"
                  onClick={handleGetStarted}
                >
                  Get Started 
                </Button>

              </Row>
            </Col>
            
            <Col
              style={{ marginTop: "130px", marginLeft: "-210px" }}
              className="img78"
            >
              <img
                id="mn"
                style={{ width: "110%", height: "532px", marginTop: "-30px" }}
                src="https://i.postimg.cc/4dk43fVB/52938d0635e18aed5998dd7e6642f0db.png"
                alt="rtw"
              />
            </Col>
            
          </Row>
          <Element name="section2">
              <div className="img2">
                <img
                  style={{
                    marginRight: "90px",
                    width: "58%",
                    paddingTop: "13%",
                    marginLeft: "24%",
                    height: "340px",
                    marginTop:"-81%"
                  }}
                  src={hr}
                  alt="etr"
                />
              </div>
            </Element>
        </div>
            )}

      </Element>

      <Element name="section3" >
        <div className="container  shadow-lg p-3 mb-5 bg-white text-start yy" style={{width:'94%'}}>
          <p className="ms-2 tr2 ">Track your product</p>
          <p className="mt-2 ms-2 tr">
            DoorDash Tracking lets you stay in the loop, ensuring you know where
            your delivery is at all times. Real-time location updates and
            estimated arrival times make waiting a thing of the past.
          </p>
          <div>
            
           
            <Row>
              <Col className=" mt-2">
                <Form className="container w-75 ms-5 ">
                  <Form.Group
                    className="mb-3 "
                    id="tt"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      id="bbbbc"
                      type="text"
                      placeholder="Tracking Id"
                      value={tracking_id}
                      onChange={(e) => setTrackingId(e.target.value)}
                    />
                     {trackingIdError && (
              <Form.Text style={{marginLeft:'-41%',whiteSpace:'nowrap'}} className="text-danger">{trackingIdError}</Form.Text>
            )}
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Link  onClick={handleTrackOrder}>
                  <Button
                    style={{ paddingLeft: "5px" }}
                    className="  ttt  text-white"
                    id="tt mn"
                    variant="primary"
                    size="lg"
                    active
                    
                  >
                    <span id="hy">Track Your Order</span>
                  </Button>
                </Link>
              </Col>
              
            </Row>
            {tokenExists !== null && tokenExists !== "" && (

            <Row className="container resp" style={{width:'50%'}}>
                <Button style={{whitespace:'nowrap'}}
                  id="bttt"
                  variant="primary"
                  onClick={handleGetStarted}
                >
                  Get Started <i class="fa-solid fa-arrow-right"></i>
                </Button>
              </Row>
            )}
          </div>
          {showTrack2 && <Track2 />}
        </div>
      </Element>

      <Element name="home2">
        <div>
          <Home2 />
        </div>
      </Element>

      <Element name="home3">
        <div>
          <Home3 />
        </div>
      </Element>

      <div style={{marginTop:"12%"}}><Freaquently ></Freaquently></div>

      <Element name="footer">
        <div>
          <Footer />
        </div>
      </Element>

    
    </div>
  );
}

export default Home;
