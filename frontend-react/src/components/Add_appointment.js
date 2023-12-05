import {Button, Alert, Card, Col, Form, Row, Container, FormLabel, FormGroup, FormControl} from "react-bootstrap";
import { useState } from "react";
import Slots from "./slots";
const AddAppointment = () =>{
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [serviceType, setServiceType] = useState("Haircut");
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showSlot, setShowSlots] = useState(false); 
    const [successMessage, setSuccessMessage] = useState(false);
    const [failureMessage, setFailureMessage] = useState(false);
    
    const handleFirstName = (event) =>{
        setFirstName(event.target.value);
    }

    const handleLastName = (event) =>{
        setLastName(event.target.value);
    }

    const handleServiceChange = (event) =>{
        setServiceType(event.target.value);
        setShowSlots(true);
    }

    const handleSlotSelection = (slotId) =>{
        setSelectedSlot(slotId);
    }
    const handleSubmit = async (event) =>{
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:9000/appointment/student_form',{
                method:'POST',
                headers:{ 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName,
                    lastName,
                    serviceType,
                    selectedSlot,
                 //yaha bas student bhi lo, becuse jo appointment me bhej rhe hai from server
                 //usme studeny bhi jaega
                }),
                credentials: 'include',
            })
            // console.log("fetched response:- ",response.json());
                //something wrong with fetching
            if(response.ok){
                const data = await response.json();
                setSuccessMessage('Form Submitted Successfully')
                console.log(data.message);
            }else{
                setFailureMessage('Form submission failed');
                console.error('Form Submission Failed');
            }
        } catch (error) {
            console.error(error);
        }
        
    }
    return(
        <Container fluid className="d-flex justify-content-center mt-3 ">
            <Row >
            <Col md={10}>
                <Card className="mb-3">
                    <Card.Header>Add Appointment</Card.Header>
                        <Card.Body>
                        {successMessage && <Alert variant="success">{successMessage}</Alert>}
                        {failureMessage && <Alert variant="danger">{failureMessage}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" 
                                        placeholder="First Name"
                                        required
                                        value={firstName}
                                        onChange={handleFirstName}
                                        // onChange={(event) => setFormData({...formData , firstName:event.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" 
                                        placeholder="Last Name"
                                        required
                                        value={lastName}
                                        onChange={handleLastName}
                                        // onChange={(event) => setFormData({...formData , lastName:event.target.value})}
                                    />
                                </Form.Group>
                            </Row>
                            <Form.Group as={Col} className="mb-3">
                                <FormLabel>Service Type</FormLabel>
                                <Form.Check
                                    type="radio"
                                    label="Haircut"
                                    name="serviceType"
                                    value="Haircut"
                                    checked={serviceType === "Haircut"}
                                    onChange={handleServiceChange}
                                />               
                                <Form.Check
                                    type="radio"
                                    label="Shave"
                                    name="serviceType"
                                    value="Shave"
                                    checked={serviceType === "Shave"}
                                    onChange={handleServiceChange}
                                />
                            </Form.Group>
                            {showSlot && (
                                <> 
                                    <FormLabel>
                                        Select a time slot for your appointment
                                    </FormLabel>
                                    <Slots onSlotSelection={handleSlotSelection} />
                                </>
                            )}
                            {selectedSlot && (
                                <FormGroup className="mb-3">
                                    <FormLabel>Your Selected Slot</FormLabel>
                                    <FormControl type="text" readOnly value={selectedSlot}/>
                                </FormGroup>
                            )}
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    )
}

export default AddAppointment;