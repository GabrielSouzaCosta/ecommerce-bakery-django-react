import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';

export default function Products(props) {
  const [products, setProducts] = useState([]);

  function truncateString(str, num=140) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  useEffect(() => {
    const getProducts = async () => {
      let response = await axios.get(props.category+'?format=json').then(res => setProducts(res.data));
    }
    setProducts(getProducts());
  }, [])

  return (
  <>
    <div className='bg-light min-vh-100'>
      <NavBar />
      <Container fluid>
        {(Object.keys(products).length !== 0) ? 
          <>
            <Row className="m-auto justify-content-center" style={{width: '95%'}}>
              {products.map((product) => {
                return (
                    <Col sm={12} md={5} lg={3}>
                      <div key={product.id} className={`pt-2 wrapper ${props.styling}`}>
                        <div className='header' style={{ background: `url(${product.get_thumbnail}) no-repeat center`}}></div>
                        <h1 className='text-center text-uppercase fs-3 p-2' style={{letterSpacing: "0.1em"}}>{product.name}</h1>
                        <div className='border'></div>
                        <p class="info">
                          {truncateString(product.description)}
                        </p>
                        <div class="grey-border"></div>
                        <a href="#" class="text-center text-uppercase btn btn-danger w-100 position-absolute bottom-0">Read More</a>
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
