import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'
function Footer() {
    return(
        <footer className="bg-dark text-light py-4">
        <Container>
          <Row>
            <Col md={6}>
              <h3>Contact Us</h3>
              <p>
                Location: Canteen, Next to Amul Parlor
                <br />
                Phone: +91 XXXXXXXXXX
                <br />
              </p>
            </Col>
            <Col md={6}>
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </footer>  
    );
}
export default Footer;