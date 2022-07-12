import React from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Home() {
  return (
    <div className='bg-dark homepage'>
      <NavBar style={{opacity: "0.92"}}/>
        <div style={{backdropFilter: "blur(1px) brightness(70%)"}}>
          <Container className="min-vh-100 text-white" >
            <header className='d-flex align-items-center justify-content-center' style={{height: "25vh"}}>
              <h1 className='display-1 text-white text-center' style={{filter: "brightness(200%)"}}>
                Heaven Bakery
              </h1>
            </header>
            <section>
              <Row className='mx-auto justify-content-center mb-5'>

                <div className='col-11 col-md-6 col-lg-3 mb-4 mb-lg-0' style={{height: "350px"}}>
                  <Link to="/breads" className='text-decoration-none text-light'> 
                    <Card className='h-100 card-category card-category-1 bg-warning'>
                      <Card.Title className='display-5 text-uppercase text-center fw-bold pt-5 text-bright'>
                        Breads
                      </Card.Title>
                    </Card>
                  </Link>
                </div>

                <div className='col-11 col-md-6 col-lg-3 layer mb-4 mb-lg-0' style={{height: "350px"}} >
                  <Link to="/coffees" className='text-decoration-none' style={{color: "#000000bb"}}>
                    <Card className='h-100 card-category card-category-2 bg-light' >
                      <Card.Title className='display-5 text-uppercase text-center fw-bold pt-5 text-bright'>
                        Coffees
                      </Card.Title>
                    </Card>
                  </Link>
                </div>
                
                <div className='col-11 col-md-6 col-lg-3' style={{height: "350px"}}>
                  <Link to="/sweets" className='text-decoration-none text-danger'>
                    <Card className='h-100 card-category card-category-3 bg-secondary'>
                      <Card.Title className='display-5 text-uppercase text-center fw-bold pt-5 text-bright'>
                        Sweets
                      </Card.Title>
                    </Card>
                  </Link>
                </div>

              </Row>
            </section>

            <section className='d-flex justify-content-center h-100 pb-5'>
              <Card className='col-10 col-md-8 col-lg-6 align-items-center' style={{backgroundColor: '#000000cd'}}>
                <Card.Body>
                  <Card.Title as="h2" className='text-center'>
                    ABOUT US
                  </Card.Title>
                  <Card.Text className='fs-4'>
                    <p>
                      We are a Traditional Bakery founded on 1956. we offer the most heavenly breads, sweets and coffees from around the world in our establishment.
                      So come and taste it all.
                    </p>
                    <strong className='fs-3'>Adress: 818 Heaven Street<br/>
                    City: Charleston, South Carolina
                    </strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </section>
          </Container>
        </div>
      <Footer />
    </div>
    
  )
}
