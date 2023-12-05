import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import slots from '../slotList';
function Slots({onSlotSelection}){
    const [selectSlot, setSelectedSlot] = useState(null);
    const handleSlotSelection = (id) => {
        // Toggle the selection of the slot with the given ID
        setSelectedSlot(id);
        onSlotSelection(id);
    };

    return(
        <Container>
            {/* Card with image overlay saying slots and card body having the slots */}
            <h3>Select Slots</h3>
            <Row>
                {slots.map((slot) => (
                    <Col key={slot.id}>
                        <Button 
                            className={`slot ${selectSlot === slot.id ? "selected":""}`} 
                            onClick={()=>handleSlotSelection(slot.id)}>
                        {slot.time}
                        </Button>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Slots;