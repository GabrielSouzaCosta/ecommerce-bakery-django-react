import React from 'react';
import NavBar from '../NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function MyProducts() {
  return (
    <div className='min-vh-100 bg-secondary'>
        <NavBar />
        <Container fluid>
            <Row className="align-items-center" style={{height: "85vh"}}>
                <Col md={6} lg={8} >
                    <Card className="bg-light" style={{height: "500px"}}>
                        
                    </Card>
                </Col>

                <Col md={6} lg={4}>
                    <Card className="bg-light" style={{height: "600px"}}>
                        
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
