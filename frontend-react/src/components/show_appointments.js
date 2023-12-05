import { ListGroup, ListGroupItem } from "react-bootstrap";

const Show_appointment = ({slotList}) =>{
    
    return (
        <ListGroup>
            {slotList.map((slot,index)=>(
                <ListGroupItem key={index}>     
                {/* <p><small>Date: </small>{slot.aptDate}</p> */}
                <p><strong>Slot NO.</strong>{slot.id}</p>
                <p><strong>Slot Time</strong>: {slot.time}</p>
                <p><strong>Availability: </strong>{(slot.available === true ) ? 'Available' : 'N/A'}</p>
            </ListGroupItem>
            ))}
        </ListGroup>
    )
}
export default Show_appointment;