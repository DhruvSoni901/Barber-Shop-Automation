import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import '../custom.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// react-bootstrap components

const Navigatebar = () =>{
    return(
        <Navbar expand="lg" bg="success">
            <Container fluid>
                <Navbar.Brand className="mx-auto">
                    <Link to="/">
                        {/* <img
                            src="logo.jpg"
                            alt=""
                            width="30"
                            height="30"
                            className="d-inline-block align-top"/> */}
                        <span className="mx-auto navbar-text">THE BARBER SHOP</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarContent" />
                <Navbar.Collapse id="navbarContent">
                    <Nav className="ms-auto mb-2 mb-lg-0">
                        <Nav.Link as={Link} to="/admin_login" className="link-text">
                            <RiAdminFill /> Admin Login
                        </Nav.Link>
                        <Nav.Link as={Link} to="/student_login" className="link-text">
                            <PiStudentBold /> Book Now
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
export default Navigatebar;