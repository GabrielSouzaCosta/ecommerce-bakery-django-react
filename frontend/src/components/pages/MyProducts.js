import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function MyProducts() {
    const [orders, setOrders] = useSelector((state) => [state.cart.orders]);

    const navigate = useNavigate();

    console.log(orders)

  return (
    <div className='min-vh-100 bg-secondary'>
        <NavBar />
        <Container fluid>
            <Row className="align-items-center" style={{height: "85vh"}}>
                <Col md={6} lg={8} >
                    <Card className="bg-light" style={{height: "500px"}}>
                        {
                        orders.map((order) => {
                            return (
                                <div>
                                    {order.product}
                                    {order.price}
                                    {order.quantity}
                                </div>
                            )
                        })
                        }
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
