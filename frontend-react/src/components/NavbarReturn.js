import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import '../custom.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const NavigateReturn = () =>{
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
            </Container>
        </Navbar>
    );
};
export default NavigateReturn;