import React, { useState } from "react";
import { Container, Form, Button, FloatingLabel, FormControl, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Student_login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/student-section/student_login',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });
            if(response.ok){
                const data = await response.json();
                console.log(data);  
                navigate('/student_dashboard');
            }else{
                console.error('Login Failed');
            }
        } catch (error) {
            console.error(error);
        }

    };

    return(
        <Container fluid className="d-flex flex-column justify-content-center   align-items-center full-height">
            <Row className="login_bg">
            <h1>Student Login</h1>
            <Form noValidate onSubmit={handleSubmit}>
                    <FloatingLabel controlId="foremail" label="Email-address" className="mb-3">
                        <FormControl 
                            type="email" 
                            required 
                            placeholder="rollno@lnmiit.ac.in" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="forpass" label="password" className="mb-3">
                        <FormControl 
                            type="password" 
                            required 
                            placeholder="Password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                        />  
                    </FloatingLabel>

                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
            </Row>
        </Container>
    )
}
export default Student_login;