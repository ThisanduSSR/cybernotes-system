import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function AppNavbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <strong>🔐 CyberNotes</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="nav-link">Register</Link>
                <Link to="/login" className="nav-link">Login</Link>
              </>
            ) : (
              <>
                <span className="nav-link text-light">Welcome, {user}</span>
                <Button 
                  variant="outline-light" 
                  size="sm" 
                  onClick={handleLogout}
                  className="ms-2"
                >
                  Logout
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
