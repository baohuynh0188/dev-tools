import React from "react";
import { Button, Nav } from "react-bootstrap";

const Navbar = (): JSX.Element => {
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand">
          Dev-tools
        </span>
        <Button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Button variant="success" className="nav-link active">
                Create new
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
