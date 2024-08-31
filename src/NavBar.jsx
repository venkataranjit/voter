import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function NavBar() {
  const user = useContext(AuthContext);
  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {user.user ? (
              <>
                <Nav.Link as={NavLink} to="/voter">
                  Voter
                </Nav.Link>
                <Nav.Link as={NavLink} to="/voterwithcontext">
                  Voter with Context
                </Nav.Link>

                <Nav.Link as={NavLink} to="/drinks">
                  Drinks Api
                </Nav.Link>
              </>
            ) : (
              ""
            )}

            {user.user ? (
              <Nav.Link
                as={NavLink}
                to="/Logout"
                className="login"
                onClick={(e) => user.setUser(null)}
              >
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={NavLink} to="/Login" className="login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
