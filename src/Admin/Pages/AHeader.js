import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Aheader.css";
import { Link } from "react-router-dom";


function AHeader({ unreadCount }) {

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('id');
    localStorage.removeItem('userData');
     window.location.href = '/admin/login'; 
  };

  return (
    <div>
      {["sm"].map((expand) => (
        <Navbar key={expand} expand={expand} className="Navbar mb-3">
          <Container fluid>
            <Navbar.Brand href="#" style={{ marginTop: '-1%' }}>
              <Navbar.Brand id="nvb" className="mt-2" href="/admin">
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
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
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
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-left flex-grow-1 adminhome" style={{ marginTop: '3px' }}>
                  <Link to={"/admin"} style={{ textDecoration: "none" }}>
                    <Nav.Link
                      href="#action1"
                      style={{ color: "black", fontWeight: "bolder" }}
                    >
                      {<span className="ndd">Requests </span>}
                    </Nav.Link>
                  </Link>
                  <Link to={"/admin/Track"} style={{ textDecoration: "none" }}>
                    <Nav.Link
                      href="#action1"
                      style={{ color: "black", fontWeight: "bolder" }}
                    >
                      {<span className="ndd">Tracking </span>}
                    </Nav.Link>
                  </Link>

                  {/* <Link to={"/admin/Booking"} style={{ textDecoration: "none" }}>
                    <Nav.Link
                      href="#action1"
                      style={{ color: "black", fontWeight: "bolder" }}
                    >
                      {<span className="ndd">Booking </span>}
                    </Nav.Link>
                  </Link> */}
                  <Link to={"/admin/user"} style={{ textDecoration: "none" }}>
                    <Nav.Link
                      href="#action1"
                      style={{ color: "black", fontWeight: "bolder" }}
                    >
                      {
                        <span className="ndd" style={{ whiteSpace: "nowrap" }}>
                          User Control{" "}
                        </span>
                      }
                    </Nav.Link>
                  </Link>

                  {/* <Link to={"/admin/Billing"} style={{ textDecoration: "none" }}>
                    <Nav.Link
                      href="#action1"
                      style={{ color: "black", fontWeight: "bolder" }}
                    >
                      {<span className="ndd">Billing </span>}
                    </Nav.Link>
                  </Link> */}
                  <Link to={"/admin/Astatus"} style={{ textDecoration: "none" }}>
                    <Nav.Link
                      href="#action1"
                      style={{ color: "black", fontWeight: "bolder" }}
                    >
                      {<span className="ndd">Order Status </span>}
                    </Nav.Link>
                  </Link>
                </Nav>
                <Nav className="me-4">
                  <NavDropdown
                    className="username"
                    title={
                      <span className="ndd">
                        <i class="fa-regular fa-user me-4 ">
                          <span
                            className="ms-2 "
                            style={{ color: "black", fontWeight: "bolder" }}
                          >
                           Mr.Go
                          </span>
                        </i>
                      </span>
                    }
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <Link
                      to={"/admin/Login"}
                      style={{ textDecoration: "none" }}
                    >
                      <NavDropdown.Item href="#action3">Login</NavDropdown.Item>
                      <NavDropdown.Divider />
                    </Link>
                    <NavDropdown.Item href="#action5" onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                  <Link to="/admin/Acontact"  className="nav-link msg">
                    <Nav.Link href="#deets" className="naviv">
<div style={{display:'ruby'}}>
                        <i className="fa-regular fa-message bgbg"><span className="msgg">messages</span></i> 
  
</div>                      {unreadCount > 0 && (
                        <span style={{ fontSize: 'x-small', color: 'black' }} className="badge">{unreadCount} </span>
                      )} 
                    </Nav.Link>
                  </Link>
                  <Link to="/admin/Notification">
                    <Nav.Link href="#deets" className="naviv ntf">
                      <i class="fa-regular fa-bell navbaricons bgbg "><span className="msgg">Notifications</span> </i>
                    </Nav.Link>
                  </Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default AHeader;
