import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
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
            <Row className="align-items-center justify-content-center text-uppercase" style={{height: "85vh"}}>
                <Card className="bg-light py-3" style={{minHeight: "400px", maxWidth: "90%"}}>
                    <Row className='justify-content-center w-100 mx-auto align-items-end'>
                        <div className="column col-4 col-lg-3 offset-lg-1 px-0 text-center">
                            <h2 className='fs-4'>Product</h2>
                        </div>
                        <div className="column col-2 text-center px-0">
                            <h2 className='d-none d-md-block fs-4'>Price</h2>
                            <h2 className='d-block d-md-none fs-4'>$</h2>
                        </div>
                        <div className="column col-2 col-lg-1 text-center px-0">
                            <h2 className='d-none d-md-block fs-4'>Quantity</h2>
                            <h2 className='d-block d-md-none fs-4'>Qt</h2>
                        </div>
                        <div className="column col-3 col-lg-2 text-center px-0">
                            <h2 className='d-none d-md-block fs-4'>Total</h2>
                            <h2 className='d-block d-md-none fs-4'>Total</h2>
                        </div>
                        <div className="justify-content-center align-items-center p-0 ps-1 mb-1 col-1">
                            <button className="btn btn-danger text-white text-uppercase p-0" onClick={handleClearCart}>
                                <FontAwesomeIcon icon={faTrashCan} className='px-1' />
                            </button>
                        </div>
                    </Row>

                    <Row className='justify-content-center w-100 mx-auto'>
                        {(orders.length !== 0) ?
                        orders[0].map((order) => {
                            return (
                                <>
                                    <div className="column column-data col-4 col-lg-3 offset-lg-1">
                                        {order.name}
                                    </div>
                                    <div className="column column-data col-2 px-0 text-center">
                                        ${order.price}
                                    </div>
                                    <div className="column column-data col-2 col-lg-1 px-0 text-center">
                                        <input type="number" min="1" max="50" className="border-0 col-8 px-0 ms-1 ms-md-2 text-center" style={{backgroundColor: 'transparent'}} value={order.quantity} onChange={(e) => setQuantityChange(e, order.product, order.quantity)}></input>
                                    </div>
                                    <div className="column column-data col-3 col-lg-2 px-0 text-center">
                                        ${(order.price * order.quantity).toFixed(2)}
                                    </div>
                                    <div className="justify-content-center p-0 ps-1 col-1 col-lg-1" onClick={(e) => dispatch(removeProduct(order.product))}>
                                        <FontAwesomeIcon icon={faMinus} className="btn btn-danger rounded-circle p-1 d-inline-block" style={{marginTop: "2%"}} />
                                    </div>
                                </>
                            )
                        })
                        :
                        ""
                        }
                        <div lg={11} className="pt-3 text-center">
                            <h2>Total: ${total.toFixed(2)} </h2>
                        </div>      
                        <div className='col-10 col-md-6 col-lg-4 mx-auto text-center'>
                            <Link to='/checkout' className={`btn btn-danger rounded-pill text-white mt-3 ${(orders[0].length ===0) ? "disabled" : ""}`}>
                                proceed to checkout
                            </Link>
                        </div> 
                    </Row>
                </Card>
            </Row>
        </Container>
    </div>
  )
}
