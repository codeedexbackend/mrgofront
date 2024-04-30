import React, { useEffect } from "react";
import "./Home3.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Col, Form, Row } from "react-bootstrap";
import "aos/dist/aos.css";
import Aos from "aos";

function Home3() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <div>
      <div data-aos="fade-up" className="mt-5 hd">
        <p className="text-left p2" style={{marginLeft:'5%'}}>What people say about Mr. Go</p>
        <p className="container   p11 text-left" style={{width:'100%'}}>
          Discover why our customers are singing praises about our courier
          service. From swift and secure deliveries to hassle-free returns and
          friendly customer support, hear firsthand experiences that make us the
          preferred choice for reliable shipping
        </p>
      </div>

      <div data-aos="fade-up" style={{width:'90%'}} className="vv  container p-5 ">
        <div className=" vvvvv p-3 text-center">
          <div className="sliding-bar">
            <Slider {...settings}>
              <div>
                <p className="vvv">“</p>
                <div className="pp">
                  <p className="pp">
                    Absolutely thrilled with the impeccable service! My package
                    arrived safe and sound, right on time. The attention to
                    detail and commitment to secure delivery by this courier
                    service are truly commendable.
                  </p>
                </div>
              </div>
              <div>
                <p className="vvv">“</p>
                <div className="pp">
                  <p className="pp">
                    Absolutely thrilled with the impeccable service! My package
                    arrived safe and sound, right on time. The attention to
                    detail and commitment to secure delivery by this courier
                    service are truly commendable.
                  </p>
                </div>
              </div>
              <div>
                <p className="vvv">“</p>
                <div className="pp">
                  <p className="pp">
                    Absolutely thrilled with the impeccable service! My package
                    arrived safe and sound, right on time. The attention to
                    detail and commitment to secure delivery by this courier
                    service are truly commendable.
                  </p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
      <hr />

      <div data-aos="fade-up" className="mt-3">
        <p className=" p2" style={{textAlign:'left',marginLeft:'5%'}}>Calculate your Cost</p>
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
        style={{ marginLeft: "13%" }}
        className="row  " id="lo"
      >
        <div className="column">
          <img
            src="https://i.postimg.cc/0NgFfWb5/aed5a345be96a4ecdbbfc8c3e08955d0-1.png"
            alt="Your Image"
          />
        </div>
        <div className="column">
          <form>
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
            <Form.Group
              className="mb-3 "
              id="ttk"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control id="bbbb" type="select" />
            </Form.Group>
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

            <button className="w-100 mt-2 f2" type="submit">
              Calculate Cost
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home3;
