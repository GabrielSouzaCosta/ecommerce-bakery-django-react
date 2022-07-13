import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';

function BuyProductToast(props) {
  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast onClose={props.handleClose} show={props.showToast} delay={3000} autohide>
        <Toast.Header closeButton={true}>
          <strong className="me-auto">Nice!</strong>
        </Toast.Header>
        <Toast.Body>Successfully added to cart.
          <Link to="/my_products" className="btn btn-dark text-white rounded-pill ms-2">
            Go to Cart
          </Link>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}


export default function Products(props) {
  const [products, setProducts] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  function BuyProductForm(props) {
    const [quantity, setQuantity] = useState("1");

    return (
    <>
      <Col lg={4} className="m-auto mb-2">
        <div className='d-flex align-items-center justify-content-center'>
            <input type="number" value={quantity} onChange={event => setQuantity(event.target.value)} className="number ps-3 py-1 text-center" min="1" max="50" step="1" />
            <button className='btn btn-danger text-white ms-2 px-3 py-0' onClick={(e) => {
              setQuantity(1);
              setShowToast(true)
              dispatch(addToCart( {'id': props.id, 'name': props.name, 'price': props.price, 'quantity': quantity} ));
            }
          }>
              <FontAwesomeIcon icon={faCartShopping} className="pt-2" />
              Buy
            </button>
        </div>
      </Col>
    </>
    );
  }
  

  function truncateString(str, num=140) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  function handleCloseToast() {
    setShowToast(false);
  }

  useEffect(() => {
    const getProducts = async () => {
      await axios.get(process.env.REACT_APP_BACKEND_URL+props.category+'?format=json')
      .then(res => setProducts(res.data))
    }
    getProducts();
  }, [props.category])

  return (
  <>
    <div className='bg-light min-vh-100'>
      <NavBar />
      <Container fluid>
        {(Object.keys(products).length !== 0) ? 
          <>
            <Row className="m-auto justify-content-center" style={{width: '95%'}}>
              {products.map((product, i) => {
                return (
                  <Col sm={12} md={5} lg={3}>
                    <div key={product.id} className={`pt-2 wrapper ${props.styling}`}>
                      <div className='header' style={{ background: `url(${product.get_thumbnail}) no-repeat center`}}></div>
                      <h1 className='text-center text-uppercase fs-3 p-2' style={{letterSpacing: "0.1em"}}>{product.name}</h1>
                      <div className='border'></div>
                      <p className="info">
                        {truncateString(product.description)}
                      </p>
                      <div className="grey-border"></div>
                      <BuyProductForm id={product.id} name={product.name} price={product.price} />
                      <button className="text-center text-uppercase btn btn-danger w-100 bottom-0">Read More</button>
                      <span className="position-absolute top-0 end-0 px-2 text-center fs-3 text-light" style={{backgroundColor: "#000000cc"}}>${product.price}</span>
                    </div>
                  </Col>
                  )
              })} 
            </Row>
          </>
            :
            ""
        }
       </Container>
       <BuyProductToast showToast={showToast} handleClose={handleCloseToast}  />   
    </div>
    <Footer style={"dark text-white"} githubIcon={"github_white"}/>
  </>
  )
}
