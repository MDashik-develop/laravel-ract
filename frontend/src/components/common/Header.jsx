import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AdminAuthContext } from '../context/AdminAuth';


function Header() {
      const {logout} = useContext(AdminAuthContext);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <nav className="me-auto d-flex gap-3">
            <Link to="/admin/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/admin/categories" className="nav-link">Categories</Link>
            <Link to="/admin/brands" className="nav-link">Bands</Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/action/1">Action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/2">Another action</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action/3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/action/4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <button className='nav-link' onClick={logout}>Logout</button>
          </nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;