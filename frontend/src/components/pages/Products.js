import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';


export default function Products(props) {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  function InputNumber(props) {
    const [quantity, setQuantity] = useState("0");

    return (
      <Col md={6} lg={4} className="m-auto mb-2">
        <div className='d-flex align-items-center'>
            <input type="number" value={quantity} onChange={event => setQuantity(event.target.value)} className="number ps-3 py-1 text-center" min="1" max="50" step="1" />
            <button className='btn btn-danger text-white ms-2 px-3 py-0' onClick={(e) => {
              setQuantity(0);
              dispatch(addToCart( {'id': props.id, 'name': props.name, 'price': props.price, 'quantity': quantity} ));
              }
              }>
              <FontAwesomeIcon icon={faCartShopping} className="pt-2" />
              Buy
            </button>
        </div>
      </Col>
    );
  }
  

  function truncateString(str, num=140) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  useEffect(() => {
    const getProducts = async () => {
      await axios.get(props.category+'?format=json')
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
                        <InputNumber id={product.id} name={product.name} price={product.price} />
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
    </div>
  </>
  )
}
