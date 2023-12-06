import React, { useState } from "react";
import { Container, Form, Button, FloatingLabel, FormControl, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigateReturn from "./NavbarReturn";

function Admin_login(){
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleAdminSubmit = async (event) =>{
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/admin/admin_login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }), 
              });
        
              if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                navigate('/admin_dashboard'); 
              } else {
                alert('Invalid Login Credentials')
                alert('ok');
                console.error('Login failed');
                }
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
        <NavigateReturn/>
        <Container fluid className="d-flex flex-column justify-content-center align-items-center full-height">
            <Row className="login_bg">
            <h1>Admin Login</h1>
            <Form noValidate onSubmit={handleAdminSubmit}>
                    <FloatingLabel controlId="forpass" label="password" className="mb-3">
                        <FormControl
                            type="password"
                            required 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </FloatingLabel>

                <Button variant="success" type="submit">
                    Login
                </Button>
            </Form>
            </Row>
        </Container>
        </>
    )
}
export default Admin_login;