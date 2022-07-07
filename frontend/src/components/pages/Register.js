import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';
import LoadingButton from '../LoadingButton';

export default function Register() {
  return (
    <div className='vh-100 register-page'>
      <div className='h-100 blur-bg-register'>
      <Container fluid="sm" className='h-100'>
        <Col md={8} lg={4} className="mx-auto h-100" >
          <div className='d-flex align-items-center h-100'>
            <Card className='w-100 text-center py-5 px-5 bg-dark text-white' style={{borderRadius: "0 4% 0 4%", opacity: "0.89", border: "1px solid #ffffff44"}}>
              <Card.Body>
                <Card.Title className='display-5'>Register</Card.Title>
                
                <Form.Label className='text-start d-block ps-2 m-0'>Email:</Form.Label>
                <Form.Control placeholder='mr.bread@heavenbakery.com' />

                <Form.Label className='text-start d-block m-0 ps-2 pt-2'>Password:</Form.Label>
                <Form.Control className='mb-2 pb-0' placeholder='**************'/>
                <Form.Label className='text-start d-block m-0 ps-2 pt-2'>Repeat your password:</Form.Label>
                <Form.Control className='mb-2 pb-0' placeholder='**************' aria-describedby="passwordHelpBlock"/>
                <Form.Text id="passwordHelpBlock" className='text-white'>Your password must be at least 8 characters long</Form.Text>

                <LoadingButton type={"Register Account"} />
                <p className='mb-2'>or</p>
                <Link to="/login" className='d-block'>
                  <Button className="btn btn-secondary w-50">
                    Sign in
                  </Button>
                </Link>
                
              </Card.Body>
            </Card>
          </div>
        </Col>      
      </Container>
      </div>
    </div>
  )
}
