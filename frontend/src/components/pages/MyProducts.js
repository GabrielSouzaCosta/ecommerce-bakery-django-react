import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyProducts() {
    const orders = useSelector((state) => [state.cart.orders]);
    let total = 0
    const navigate = useNavigate();

  return (
    <div className='min-vh-100 bg-secondary'>
        <NavBar />
        <Container fluid>
            <Row className="align-items-center text-uppercase" style={{height: "85vh"}}>
                <Col lg={10} md={11} sm={12} className="mx-auto" >
                    <Card className="bg-light py-3 w-100" style={{minHeight: "400px"}}>
                        <Row className='justify-content-center w-100 mx-auto'>
                            <Col lg={4} sm={4} className="column">
                                <h2>Product</h2>
                            </Col>
                            <Col lg={2} sm={2} className="column">
                                <h2>Price</h2>
                            </Col>
                            <Col  lg={2} md={3}  sm={3} className="column">
                                <h2>Quantity</h2>
                            </Col>
                            <Col lg={2} sm={2} className="column">
                                <h2>Total</h2>
                            </Col>
                        </Row>

                        <Row className='justify-content-center w-100 mx-auto'>
                            {(orders.length !== 0) ?
                            orders[0].map((order) => {
                                total += order.price * order.quantity
                                return (
                                    <>
                                        <Col sm={4} md={4} lg={4}  className="column column-data">
                                            {order.product}
                                        </Col>
                                        <Col sm={2} md={2} lg={2} className="column column-data">
                                            ${order.price}
                                        </Col>
                                        <Col sm={3} md={3} lg={2} className="column column-data">
                                            <input type="number" className="border-0 w-100" style={{backgroundColor: 'transparent'}} value={order.quantity}></input>
                                        </Col>
                                        <Col sm={2} md={2} lg={2} className="column column-data">
                                            ${order.price * order.quantity}
                                        </Col>
                                    </>
                                )
                            })
                            :
                            ""
                            }
                            <Col lg={11} className="pt-3 text-center">
                                <h2>Total: ${total.toFixed(2)} </h2>
                            </Col>  
                            <Col sm={10} md={6} lg={4} xxl={3}>
                                <Link to='/checkout' className='btn btn-danger rounded-pill text-white w-100 mt-5'>
                                    proceed to checkout
                                </Link>
                            </Col> 
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
  )
}
