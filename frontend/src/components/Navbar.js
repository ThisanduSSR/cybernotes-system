import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function AppNavbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top" className="app-navbar">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <span className="brand-icon">🔐</span>
          <div>
            <div className="brand-title">CyberNotes</div>
            <div className="brand-subtitle">Secure notes, fast access</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="nav-link nav-action">
                  Register
                </Link>
                <Link to="/login" className="nav-link nav-action">
                  Login
                </Link>
              </>
            ) : (
              <>
                <span className="nav-link nav-user">
                  Welcome, {user?.split("@")[0] || "User"}
                </span>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                  className="ms-2 nav-logout"
                >
                  🚪 Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
