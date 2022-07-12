import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, removeProduct, clearCart } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faTrashCan } from '@fortawesome/free-solid-svg-icons';


export default function MyProducts() {
    const orders = useSelector((state) => [state.cart.orders]);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);

    function setQuantityChange(e, id, oldQuantity) {
        let quantity = e.target.value - oldQuantity
        dispatch(incrementQuantity({'id': id, 'quantity': quantity}))
    }

    function setTotalValue() {
        var newTotal = 0
        orders[0].forEach((order) => {
            newTotal += order.price * order.quantity
        })
        setTotal(newTotal)
    }

    function handleClearCart () {
        dispatch(clearCart());
    }

    useEffect(() => {
        setTotalValue();
    }, [orders[0]])

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
                            <Col lg={1} className="justify-content-center align-items-center p-0 ps-1">
                                <button className="btn btn-danger text-white text-uppercase p-1 mt-1" onClick={handleClearCart}>
                                   <span className='me-1'>
                                    <FontAwesomeIcon icon={faTrashCan} />
                                    </span>
                                    Cancel all
                                </button>
                            </Col>
                        </Row>

                        <Row className='justify-content-center w-100 mx-auto'>
                            {(orders.length !== 0) ?
                            orders[0].map((order) => {
                                return (
                                    <>
                                        <Col sm={4} md={4} lg={4}  className="column column-data">
                                            {order.name}
                                        </Col>
                                        <Col sm={2} md={2} lg={2} className="column column-data">
                                            ${order.price}
                                        </Col>
                                        <Col sm={3} md={3} lg={2} className="column column-data">
                                            <input type="number" min="1" max="50" className="border-0 w-100" style={{backgroundColor: 'transparent'}} value={order.quantity} onChange={(e) => setQuantityChange(e, order.product, order.quantity)}></input>
                                        </Col>
                                        <Col sm={2} md={2} lg={2} className="column column-data">
                                            ${(order.price * order.quantity).toFixed(2)}
                                        </Col>
                                        <Col lg={1} className="justify-content-center p-0 ps-1" onClick={(e) => dispatch(removeProduct(order.product))}>
                                            <FontAwesomeIcon icon={faMinus} className="btn btn-danger rounded-circle p-1 d-inline-block" style={{marginTop: "2%"}} />
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
                                <Link to='/checkout' className={`btn btn-danger rounded-pill text-white w-100 mt-3 ${(orders[0].length ===0) ? "disabled" : ""}`}>
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
