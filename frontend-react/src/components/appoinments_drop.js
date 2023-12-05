import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, CardHeader, Col, ListGroup } from 'react-bootstrap';
import Show_appointment from './show_appointments';
import slots from '../slotList';

function Appointment_drop(){

    return(
        <>
                <Col md={8} className="d-flex flex-column justify-content-center">
                    <Card className='mb-3'>
                        <CardHeader>Appointments</CardHeader>
                        <ListGroup variant='flush' style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <Show_appointment slotList={slots}/>
                        </ListGroup>
                    </Card>
                </Col>
        </>
    )
}   

export default Appointment_drop;