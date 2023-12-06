import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { Button, Col, Row, Container, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BsInfoCircle } from "react-icons/bs";
import Appointment_drop from "./appoinments_drop";


function Home(){
  const navigate = useNavigate();
  const [showAppointment, setShowAppointment] = useState(false);
  const ToggleAppointment = ()=>{
    setShowAppointment(!showAppointment);
  }
  const BookNowClick = () => {
    navigate('/student_login');
  }
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

    return(
        <>
        <Navbar />
        <Container fluid className="d-flex flex-column justify-content-center align-items-center full-height main-container">
          <Row className="justify-content-end align-self-start full-width mt-0">
            <Col md={1} className="px-0" style={{width:"2.4%"}}><Button onClick={handleShow} variant="secondary"><BsInfoCircle /></Button></Col>
            
            <Offcanvas show={show} onHide={handleClose} scroll={true} >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Instructions</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <h4>Welcome to Barber Automation</h4>
                <hr/>
                <h5>For Student Login: </h5><p style={{fontSize:"1rem"}}>Click on Book Now</p>
                <br/>
                <h5>For Barber Login: </h5><p style={{fontSize:"1rem"}}>Click on Admin Login</p>
                <br/>
                <h5>To check status of available appointments </h5><p style={{fontSize:"1rem"}}>Click on Check Appointments</p>
              </Offcanvas.Body>
            </Offcanvas>
          </Row>
          <Row className="mb-4">
            <Col md={12}  className='text-center'>
              <h1 className='animate__animated animate__bounceInLeft'>Welcome to the Barber Automation</h1>
            </Col>
            <Col md={6} className='d-flex justify-content-center'>
              <Button variant="primary" size="lg" onClick={ToggleAppointment}>Check Current Appointments</Button>
            </Col>
            <Col md={6} className='d-flex justify-content-center'>
              <Button variant="success" size="lg" onClick={BookNowClick}>Book Now</Button>
            </Col>
          </Row>
            
          {showAppointment && <Appointment_drop />}
        </Container>
        </>
    )
}
export default Home;