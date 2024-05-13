import React, { useEffect, useState } from "react";
import "./Home3.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button,Form, Modal} from "react-bootstrap";
import "aos/dist/aos.css";
import Aos from "aos";
import { Link } from "react-router-dom";

function Home3() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    const select = document.getElementById("bbbb");
    if (isOpen) {
      select.blur();
    } else {
      select.focus();
    }
  };
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <div data-aos="fade-up" className="mt-5 hd">
        <p className="text-left p2" id="whr">What people say about Mr. Go</p>
        <p className="container   p11 text-left" style={{width:'100%'}}>
          Discover why our customers are singing praises about our courier
          service. From swift and secure deliveries to hassle-free returns and
          friendly customer support, hear firsthand experiences that make us the
          preferred choice for reliable shipping
        </p>
      </div>

      <div data-aos="fade-up" style={{width:'90%',marginTop:'2%'}} className="vv  container p-5 ">
        <div className=" vvvvv p-3 text-center">
          <div className="sliding-bar">
            <Slider {...settings}>
              <div>
                <p className="vvv">“</p>
                <h4 style={{marginTop:'-11%',fontWeight:'700',color:'#0e2c53'}}>DTDC</h4>
                <div className="pp">
                  
                  <p className="pp">
                  DTDC is a popular courier and logistics company based in India. Established in 1990, DTDC has grown to become one of the largest courier companies in India, offering a range of services including domestic and international courier, freight forwarding, supply chain solutions, and e-commerce logistics.
                  </p>
                </div>
              </div>
              <div>
                <p className="vvv">“</p>
                <h4 style={{marginTop:'-11%',fontWeight:'700',color:'#f27121'}}>                    TRACKON
</h4>

                <div className="pp">
                  <p className="pp">
                    Trackon Courier is another prominent courier and logistics company in India. Founded in 2002, Trackon has established itself as a reliable player in the industry, offering a variety of courier and cargo services including domestic and international delivery, express delivery, surface transportation, and logistics solutions.
                  </p>
                </div>
              </div>
              <div>
                <p className="vvv">“</p>
                <h4 style={{marginTop:'-11%',fontWeight:'700',color:'#b02925'}}>                    SPEED POST
</h4>
                <div className="pp">
                  <p className="pp">
                    
Speed Post is a postal service provided by India Post, the government-operated postal system in India. It offers high-speed and time-bound delivery of letters, documents, parcels, and other items within India as well as to international destinations
                  </p>
                </div>
              </div>
              <div>
                <p className="vvv">“</p>
                <h4 style={{marginTop:'-11%',fontWeight:'700',color:'#e92429'}}>                   PROFESSIONAL
</h4>
                <div className="pp">
                  <p className="pp">
                  The Professional Couriers is today recognized as a trusted and reliable courier and cargo company.
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
      <hr />

      <div data-aos="fade-up" className="mt-3">
        <p className=" p2" style={{textAlign:'left'}} id="whru">Calculate your Cost</p>
        <p className="container   p11" style={{width:'90%',textAlign:'left'}}>
          Navigate through our straightforward pricing structure with our
          easy-to-use service cost calculator. No hidden fees – just
          transparency and clarity. Know exactly what to expect for your
          shipment, making your shipping experience stress-free and
          budget-friendly
        </p>
      </div>

      <div
        data-aos="fade-up"
        style={{ marginLeft: "13%",marginTop:'4%' }}
        className="row  " id="lo"
      >
        <div className="column">
          <img
            src="https://i.postimg.cc/0NgFfWb5/aed5a345be96a4ecdbbfc8c3e08955d0-1.png"
            alt="Your"
          />
        </div>
        <div className="column">
          <form onSubmit={handleSubmit}>
            <label className="me-4 f1" htmlFor="name">
              Enter Pickup PIN Code
            </label>
            <Form.Group
              className="mb-3 "
              id="ttk"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control id="bbbb" type="name" />
            </Form.Group>
            <label className="f1" htmlFor="password">
              Enter Delivery PIN Code
            </label>
            <Form.Group
              className="mb-3 "
              id="ttk"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control id="bbbb" type="name" />
            </Form.Group>
            <label className="me-4 f1" htmlFor="name">
        Select Service
      </label>
      <Form.Select
                  id="Shipping_Through"
style={{backgroundColor:'#eeeeee'}}
                >
                  <option disabled value="">
                    Shipping Through
                  </option>
                  <option>TRACKON</option>
                  <option>DTDC</option>
                  <option>SPEED POST</option>
                  <option>PROFESSIONAL</option>
                </Form.Select>

            <label className="me-4 f1" htmlFor="name">
              Weight
            </label>
            <Form.Group
              className="mb-3 "
              id="ttk"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control id="bbbb" type="text" />
            </Form.Group>

            <button className="w-100 mt-2 f2" onClick={handleSubmit}>
              Calculate Cost
            </button>
          </form>
        </div>
      </div>
      
        {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Message: Please contact admin for further assistance.</p>
         
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        <Link to={'/contactus'}>  <Button variant="secondary">Contact Admin</Button></Link>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home3;
