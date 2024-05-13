import React, { useEffect } from 'react'
import {Col, Row } from 'react-bootstrap';
import './Aboutus.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Freaquently from '../components/Freaquently';




function Aboutus() {
    useEffect(() => { 
        window.scrollTo(0, 0); 
      }, []);
    return (
        <div>
            <Header></Header>
            <div>
                <img id='abimage' src="https://i.postimg.cc/5yRYtc3g/Rectangle-56.png"  alt="Card 1" />
            </div>
            <div style={{ backgroundColor: "white" }}>
                <div>
                    <h1 style={{ fontSize:"36px" , textAlign: "center", padding: "10px" }}> <b>About Us</b></h1>
                    <p style={{ fontSize: "16px",textAlign:"center" }} className='p-2 container w-75 lppl' id='lppl'>Welcome to Mr.GO! We're more than just a delivery service. Our team is dedicated to making connections easy. We focus on being reliable, fast, and giving personal service. We bring people, businesses, and opportunities closer together. Trust us for your deliveries and experience a courier service that really cares. Join us in a world where every mile and every promise counts.
                    </p>
                </div>
                <div>
                    <h1 style={{fontSize:"36px" , textAlign: "center", padding: "10px" }}><b>Our Motto</b></h1>
                    <p style={{ fontSize: "16px" ,textAlign:"center" }} className='p-2 container w-75 lppl' >At Mr. GO, we live by a simple motto: "Bridging Gaps, Building Connections." We go beyond just delivering packages; our aim is to connect people and open up possibilities. With dependable service and a personal approach, each delivery becomes an opportunity to enhance connections. Come along on a journey where every delivery builds bridges to lasting relationships.
                    
                    </p>
                </div>
            </div>
            <div className='partnerss' style={{ backgroundColor: "lightgray",paddingBottom:'2%' }}>
                <div className='container w-75'>
                    <h1 style={{ fontSize:"36px" ,textAlign: "center", padding: "2px" }}><b> Our Services</b></h1>
                    <Row>
<Col lg={3}>
                            <img className='partners pt ms-2'  src="https://i.postimg.cc/sDsFKnp6/Rectangle-58.png" alt="ert" />
    
</Col>                       <Col lg={3}> <img className='partners1 pt pt2 ms-2'  src="https://i.postimg.cc/Wz7HQvM9/Rectangle-59.png" alt="" /></Col>
                             <Col lg={3}> <img className='partners1 pt pt2 ms-2'  src="https://i.postimg.cc/sXCXp7Sk/logo.png" alt="" /></Col>
                             <Col lg={3}> <img className='partners1 pt pt2 ms-2'  src="https://i.postimg.cc/rwpQktd2/India-Post-LOGO.jpg" alt="" /></Col>
                    </Row>
                </div>
                
            </div>
           <Freaquently></Freaquently>
            
                <Footer></Footer>
           
        </div>

    )
}

export default Aboutus