import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';
import LoadingButton from '../LoadingButton';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div className='vh-100 login-page'>
      <div className='h-100 blur-bg'>
      <Container fluid="sm" className='h-100'>
        <Col md={6} lg={4} className="mx-auto h-100" >
          <div className='d-flex align-items-center h-100'>
            <Card className='w-100 text-center py-5 border-0 bg-light' style={{borderRadius: "4% 0 4% 0", filter: "drop-shadow(0px 16px 50px #000)", opacity: "0.95"}}>
              <Card.Body>
                <Card.Title className='display-5'>Login</Card.Title>
                
                <Form.Label className='text-start d-block ps-2 m-0'>Email:</Form.Label>
                <Form.Control placeholder='mr.bread@heavenbakery.com' value={email} onChange={handleEmailChange}/>

                <Form.Label className='text-start d-block m-0 ps-2 pt-2'>Password:</Form.Label>
                <Form.Control className='mb-2 pb-0' placeholder='**************' aria-describedby="passwordHelpBlock" value={password} onChange={handlePasswordChange} />
                <Form.Text id="passwordHelpBlock" muted >Your password must be at least 8 characters long</Form.Text>

                <LoadingButton type={"Sign in"}/>
                <p className='mb-2'>or</p>
                <Link to="/register" className='d-block'>
                  <Button className="btn btn-secondary w-50">
                    Create an Account
                  </Button>
                </Link>

                <Link to="/login" className='position-absolute link-danger fw-bold bottom-0 start-0 end-0 pb-3'>Forgot your password?</Link>

                
              </Card.Body>
            </Card>
          </div>
        </Col>      
      </Container>
      </div>
    </div>
  )
}
