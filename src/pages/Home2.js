import React, { useEffect } from "react";
import "./Home2.css";
import "aos/dist/aos.css";
import Aos from "aos";

function Home2() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <div>
      <div className="mt-2">
        <h2 style={{textAlign:'center'}}>Why Choose Us</h2>
        <p
          className="container  mt-2 text-left"
          id="ik"
          style={{ width: "93%" }}
        >
          We prioritize speed without compromising on reliability. Our
          experienced team ensures your packages reach their destination swiftly
          and securely. From document deliveries to special packages, trust Mr.
          Go for a seamless and trustworthy courier experience. Choose speed,
          choose reliability, choose Mr. Go Couriers.
        </p>
      </div>

      <div className="card-container mt-5 container " id="cards">
        <div data-aos="fade-up" className="card vc" id="cdr">
          <div class="rounded-box ">
            <img
              style={{ zIndex: "1" }}
              src="https://i.postimg.cc/z3ZDJdLJ/7074db4fae37d246e1a32c25660342d1.png"
              alt="Card 1"
            />
          </div>
          <h5 className="mt-3">
            <b className="cdp">Easy To Order</b>
          </h5>
          <p className="ca container  text-center ">
            Make shipping easy with our simple website. Ordering is quick, easy,
            and made for your convenience
          </p>
        </div>

        <div data-aos="fade-up" className="card vc"id="cdr" >
          <div class="rounded-box rounded-box2 ">
            <img
              style={{ zIndex: "1" }}
              src="https://i.postimg.cc/Hx7sfJ3D/e181331c8066f48085e340b5de3660ff.png"
              alt="Card 2"
            />
          </div>
          <h5 className="mt-3">
            <b className="cdp">Cash On Delivery</b>
          </h5>
          <p className="ca container  text-center ">
            Be flexible! Choose Cash on Delivery and pay safely when you get
            your package. We make transactions easy and trustworthy
          </p>
        </div>
        <div data-aos="fade-up" className="card vc" id="cdr">
          <div class="rounded-box rounded-box3 ">
            <img 
              style={{ zIndex: "1" }}
              src="https://i.postimg.cc/Wbc73CDg/fd80220fd724fb0b4f73d7d4c51d2a4a.png"
              alt="Card 3"
            />
          </div>
          <h5 className="mt-3">
            <b className="cdp">Live Tracking</b>
          </h5>
          <p className="ca container  text-center ">
            Know where your parcel is with live tracking! Watch your package's
            journey in real-time, so you always know what's happening with your
            delivery{" "}
          </p>
        </div>
        <div data-aos="fade-up" className="card vc" id="cdr">
          <div class="rounded-box rounded-box4 ">
            <img
              style={{ zIndex: "1" }}
              src="https://i.postimg.cc/fLjY0TSd/b8a08110e1244515d890a09f95577d78.png"
              alt="Card 4"
            />
          </div>
          <h5 className="mt-3">
            <b className="cdp">Quick Delivery</b>
          </h5>
          <p className="ca container  text-center ">
            Need it quick? We're here for you! Our fast delivery service gets
            your packages to you on time, and we always make sure they're safe
          </p>
        </div>
        <div data-aos="fade-up" className="card vc" id="cdr">
          <div class="rounded-box rounded-box5 ">
            <img
              style={{ zIndex: "1" }}
              src="https://i.postimg.cc/brwSD0hX/502fa23a0c74614cf50d2615ff796b90.png"
              alt="Card 5"
            />
          </div>
          <h5 className="mt-3">
            <b className="cdp">Safe Delivery</b>
          </h5>
          <p className="ca container  text-center ">
            Trust us with your important packages. We promise safe delivery, so
            your items arrive in perfect shape, and you can relax
          </p>
        </div>
        <div data-aos="fade-up" className="card vc" id="cdr">
          <div class="rounded-box rounded-box6 ">
            <img
              style={{ zIndex: "1" }}
              src="https://i.postimg.cc/76sYRppc/8452e188f28f652133f29454f850148d.png"
              alt="Card 6"
            />
          </div>
          <h5 className="mt-3">
            <b className="cdp">Lowest Pricing</b>
          </h5>
          <p className="ca container  text-center ">
            Save money on shipping without losing quality! Our affordable
            options give you budget-friendly choices without compromising on
            reliable and efficient service
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home2;
