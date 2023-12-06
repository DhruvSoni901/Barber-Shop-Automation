import React, { useState, useEffect, useRef} from "react";
import { Button, Card, Col, Container, Form, Modal, Row, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [show , setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();

    const [inventory, setInventory] = useState({
      scissors:0,
      comb:0,
      cloth:0,
      shavingcream:0,
      powder:0,
      blade:0,
    })

    const inventoryRef = useRef({
      scissors:0,
      comb:0,
      cloth:0,
      shavingcream:0,
      powder:0,
      blade:0,
    })

    useEffect(() => {
      // Fetch appointments and student details from backend.
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:9000/admin/appointments');
          console.log(response);
          if (response.ok) {
            const data = await response.json();
            setAppointments(data);
          } else {
            console.error('Failed to fetch appointments');
          }
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchData();
    }, []);

    //fetch inventory 
    useEffect(() => {
      async function fetchInventory() {
        try {
          const response = await fetch('http://localhost:9000/admin/inventory');
          if (response.ok) {
            const data = await response.json();
            setInventory(data);
            inventoryRef.current = data;
          } else {
            console.error('Failed to fetch inventory details');
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchInventory();
    }, []);

    const handleApprove = async (appointmentId) =>{
      try {
        const response = await fetch(`http://localhost:9000/admin/appointment/approve/${appointmentId}`,{
          method: 'PUT',
        })
        if(response.ok){
          setAppointments((prevAppointments) => prevAppointments.map((appointment) => appointment._id === appointmentId ? {...appointment, status:'Approved'} : appointment
          )
          );
        }else{
          console.error('Failed to approve appointment');
        }

      } catch (error) {
        console.error(error)
      }
    }

    const handleDecline = async (appointmentId) =>{
      try {
        const response = await fetch(`http://localhost:9000/admin/appointment/decline/${appointmentId}`, {
          method: 'DELETE',
        })
        
        if(response.ok){
          setAppointments((prevAppointments)=> prevAppointments.filter((appointment)=> appointment._id !== appointmentId))
        }
      } catch (error) {
        console.error(error);
      }
    }

    const handleInventoryUpdate = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch('http://localhost:9000/admin/update-inventory', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inventoryRef.current),
        });
  
        if (response.ok) {
          console.log('Inventory updated successfully');
        } else {
          console.error('Failed to update inventory');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const handleInventoryChange = (event, key) => {
      const value = parseInt(event.target.value, 10);
      setInventory((prevInventory) => ({ ...prevInventory, [key]: value }));
      inventoryRef.current[key] = value;
    };

    const handleLogout = async () =>{
        navigate('/admin_login');
    }
  
    return (
      <>
      <Navbar expand="lg" bg="secondary" className="mb-3">
                <Container fluid>
                    <Navbar.Brand className="d-flex justify-content-center">Admin Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarContent" />
                    <Navbar.Collapse id="navbarContent">
                        <Nav className="ms-auto mb-2 mb-lg-0">
                            <Button variant="outline-light" onClick={handleLogout}><IoExitOutline/></Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
      <Container className="mb-3 full-height">
        
        <Row className="justify-content-center">
          <Col md={7} className="ms-7 mt-4" style={{ maxHeight: '717px', overflowY: 'auto' }}>
            <h1>Slot Status</h1>
            {appointments.length === 0 ? (
              <p>No Active Appointments</p>
            ):(
              appointments.map((appointment) => (
              <Card key={appointment._id} className="mb-3">
                <Card.Body>
                  <Card.Title>Slot: {appointment.selectedSlot}</Card.Title>
                  <Card.Text>
                  <p>Roll Number: {appointment.rollno}</p>
                  <p>Contact: {appointment.contact}</p>
                  <p>Service Type: {appointment.serviceType}</p>
                  </Card.Text>
                  <Button variant="success" onClick={() => handleApprove(appointment._id)}>Approve</Button>{' '}
                  <Button variant="danger" onClick={() => handleDecline(appointment._id)}>Decline</Button>
                </Card.Body>
              </Card>
            ))
          )}
          </Col>
          <Col md={2} className="inventory_list mb-3 mt-4">
          <Button variant="warning" onClick={handleShow} >View Inventory</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Inventory</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form onSubmit={handleInventoryUpdate}>
                  {Object.entries(inventory).map(([key, value]) => (
                    <Form.Group key={key} className="mb-2">
                      <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                      <Form.Control
                        type="number"
                        value={value}
                        onChange={(event) => handleInventoryChange(event, key)}
                      />
                    </Form.Group>
                  ))}
                    <Button variant="outline-warning" type="submit">Update</Button>
                  </Form>
                </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
      </>
    );
  };
export default AdminDashboard;