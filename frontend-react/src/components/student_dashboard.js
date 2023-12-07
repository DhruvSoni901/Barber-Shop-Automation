import React, { useEffect, useState } from "react";

import { Button, Container, Nav, Navbar, Card, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineForm } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
//account Dashboard
const StudentDashboard = () =>{
    const navigate = useNavigate();
    const [appointments,setAppointment] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            try{
                console.log("hi");
                const response = await fetch("http://localhost:9000/student-section/student-appointment",{
                    method:"GET",
                    credentials: 'include',
                })
                console.log(response);
                if(response.ok){
                    const data = await response.json();
                    setAppointment(data);
                }else{
                    console.error('Failed to fetch student appointment');
                }
            }catch(error){
                console.error(error);
            }
        }
        
        fetchData();
    }, []);

    const approvedAppointments = appointments.filter(
        (appointment) => appointment.status === "Approved"
      );
    const pendingAppointments = appointments.filter(
        (appointment) => appointment.status === "Pending"
      );
    const handleAptDecline = async (appointmentId) =>{
      try {
        const response = await fetch(`http://localhost:9000/student-section/delete/${appointmentId}`, {
          method: 'DELETE',
        })
        if(response.ok){
          setAppointment((prevAppointments)=> prevAppointments.filter((appointment)=> appointment._id !== appointmentId))
        }
      } catch (error) {
        console.error(error);
      }
    }
    const handleLogout = async () =>{
      try {
        const response = await fetch("http://localhost:9000/student-section/logout",{
          method: 'POST',
          credentials: 'include',
        });
        if(response.ok){
          console.log("Logout Successful");
          navigate('/student_login');
        }else{
          console.error("Logout failed");
        }
      } catch (error) {
        console.error(error);
      }
    }

    return(
        <>
            <Navbar expand="lg" bg="secondary" className="mb-3">
                <Container fluid>
                    <Navbar.Brand className="d-flex justify-content-center">Student Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarContent" />
                    <Navbar.Collapse id="navbarContent">
                        <Nav className="ms-auto mb-2 mb-lg-0">
                            <Nav.Link as={Link} to="/student_form" className="link-text">
                                <AiOutlineForm />
                            </Nav.Link>
                            <Button variant="outline-light" onClick={handleLogout}><IoExitOutline/></Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="short-height">
                <Row>
                    <h3>Pending Appointments</h3>
                {pendingAppointments.length === 0 ? (
                    <p>No Appointments</p>
                    
                ):(
                    pendingAppointments.map((appointment) => (
                        <Card key={appointment._id} className="mb-3" bg="light">
                          <Card.Body>
                            <Card.Title>Slot: {appointment.selectedSlot}</Card.Title>
                            <Card.Text>
                              <p>Service Type: {appointment.serviceType}</p>
                              <p>Status: { 'Pending'}</p>
                            </Card.Text>
                            <Button variant="danger" onClick={() => handleAptDecline(appointment._id)}><MdDelete/>Delete</Button>
                          </Card.Body>
                        </Card>
                      ))
                )}
                <hr/>
                </Row>
                <Row>
                    <h3>Approved Slots</h3>
                    {approvedAppointments.length === 0 ? (
                        <p>No Approved Appointments</p>
                    ) : (
                        approvedAppointments.map((appointment) =>(
                            <Card key={appointment._id} className="mb-3" bg="success">
                            <Card.Body>
                              <Card.Title>Slot: {appointment.selectedSlot}</Card.Title>
                              <Card.Text>
                                <p>Service Type: {appointment.serviceType}</p>
                                <p>Status: {appointment.status}</p>
                              </Card.Text>
                            </Card.Body>
                        </Card>
                        ))
                    )}
                </Row>
                
            </Container>
        </>
    )
}
export default StudentDashboard;