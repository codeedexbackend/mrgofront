import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link as RouterLink, useLocation } from "react-router-dom";

function CustomAlert({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please login first to view your orders.</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Header() {
  const tokenExists = localStorage.getItem("id");
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const handleCloseAlert = () => setShowAlert(false);
  const handleShowAlert = () => setShowAlert(true);
  const [formData, setFormData] = useState(null); // State to hold form data
  const [userName, setUserName] = useState(""); // State to hold user's name

  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("formData");
    localStorage.removeItem("statusValues");
    localStorage.removeItem("tracking_id");
    localStorage.removeItem("userData");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("tickedContacts");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    sessionStorage.removeItem("formData")
    // Clear browsing history
    window.history.replaceState({}, document.title, "/");

    // Navigate to home page
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleMyOrdersClick = () => {
    if (tokenExists) {
      navigate(`/orders/${id}`);
    } else {
      handleShowAlert();
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

  useEffect(() => {
    if (location.action === "POP" && !localStorage.getItem("id")) {
      navigate("/"); // Redirect to home if not logged in
    }
  }, [location, navigate]);

useEffect(() => {
  const storedUserName = localStorage.getItem("userName");
  if (storedUserName) {
    setUserName(storedUserName);
  } else {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserName(parsedUserData.full_name);
    }
  }
}, []);
// useEffect(() => {
//   const storedUserName = localStorage.getItem("userName");
//   if (storedUserName) {
//     console.log("Stored user name:", storedUserName);
//     setUserName(storedUserName);
//   }
// }, []);



  return (
    <div>
      {["xl"].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-primary mb-3">
          <Container fluid>
            <Navbar.Brand id="nvb" className=" mt-2" href="/">
              <img
                style={{ marginTop: "-8%" }}
                src="https://i.postimg.cc/7ZDTGbFg/auto-group-2qzw.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
              <span className="mrgoo">
                <b style={{ color: "red" }}>r. Go</b>
              </span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton />
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <RouterLink
                    to="/"
                    id="hhome"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Nav.Link className="ms-5 head" href="/">
                      <b> Home</b>
                    </Nav.Link>
                  </RouterLink>
                  <RouterLink
                    to="/aboutus"
                    style={{ textDecoration: "none", color: "black" }} 
                  >
                    <Nav.Link
                      href="/aboutus"
                      className="ms-5 head"
                    >
                      <b> About Us</b>
                    </Nav.Link>
                  </RouterLink>

                  <NavDropdown
                    className="ms-5 head"
                    style={{ fontWeight: "bolder" }}
                    title="Services"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <RouterLink
                      to="/expressservice"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <NavDropdown.Item href="/expressservice">
                        <b>Express Delivery</b>
                      </NavDropdown.Item>
                    </RouterLink>
                    <RouterLink
                      to="/smartbox"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <NavDropdown.Item href="/smartbox">
                        <b>Smart Box</b>
                      </NavDropdown.Item>
                    </RouterLink>
                    <RouterLink
                      to="/b2b"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <NavDropdown.Item href="/b2b">
                        <b>B2B Shipping</b>
                      </NavDropdown.Item>
                    </RouterLink>
                    <RouterLink
                      to="/ecommerce"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <NavDropdown.Item href="/ecommerce">
                        <b>E-Commerce Shipping</b>
                      </NavDropdown.Item>
                    </RouterLink>
                  </NavDropdown>
                  {tokenExists !== null && tokenExists !== "" && (
                    <RouterLink
                      to={`/orders/${id}`}
                      id="hhome"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Nav.Link
                        className="ms-5 head"
                        onClick={handleMyOrdersClick}
                      >
                        <b> My Orders</b>
                      </Nav.Link>
                    </RouterLink>
                  )}

                  <RouterLink
                    to="/contactus"
                    id="hhome"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Nav.Link className="ms-5 head" href="/contactus">
                      <b> Contact Us</b>
                    </Nav.Link>
                  </RouterLink>
                  {tokenExists !== null && tokenExists !== "" && (
                    <RouterLink
                      to="/Profile"
                      id="hhome"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Nav.Link className="ms-5 head" href="/contactus">
                        <i className="fa-regular fa-user"></i>
                        {userName && (
        <span className="ms-3 head">
          <b>{userName}</b>
        </span>
      )}    
                      </Nav.Link>
                    </RouterLink>
                  )}
                  {tokenExists !== null && tokenExists !== "" ? (
                    <Button 
                      onClick={handleLogout}
                      className="ms-5 head"
                      type="submit"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSignUp}
                      className="ms-5 head"
                      type="submit"
                    >
                      SignUp 
                    </Button>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {/* Custom alert component */}
      <CustomAlert show={showAlert} handleClose={handleCloseAlert} />
    </div>
  );
}

export default Header;
