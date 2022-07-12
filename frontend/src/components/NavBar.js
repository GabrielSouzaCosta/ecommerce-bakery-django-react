import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faStore } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import axios from 'axios';
import getCookie from './CSRFToken';

export default function NavBar (props) {
  const [token, setToken] = useState("");
  const orders = useSelector((state) => state.cart.orders)

  function handleLogout(event) {
    axios.post('/accounts/logout/', {}, {headers: {
      "x-csrftoken": getCookie("csrftoken")
    }})
    sessionStorage.removeItem('token');
    setToken(sessionStorage.getItem('token'));
  }

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, [])

  return (
    <> 
      <Navbar bg='dark' style={props.style} sticky="top" expand="lg" >    
      <Container fluid={true}>
        <Navbar.Brand className='d-lg-none'>
          <Link to="/">
            <Image src='logo.png' width={"120px"}/>
          </Link>
        </Navbar.Brand>
        <Link to="/my_products" className='d-lg-none pe-4 text-decoration-none position-relative ms-auto'>
          <FontAwesomeIcon icon={faStore} style={{color: "rgba(200, 98, 109, 0.9)", height: "1.5rem"}}/>
          <span className='card d-inline text-white rounded-circle px-1 position-absolute top-0 end-0 me-3' style={{backgroundColor: "transparent", border: "2px solid #ffffff", fontSize: "0.7rem"}} >
            {(orders) ? <>
              {orders.length}
            </>
            :
            "0"
            } 
            </span>
          <div className='text-danger text-uppercase fs-5'>Cart</div>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='me-1 bg-light' style={{borderRadius: "3px"}}/>

      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className='justify-content-center align-items-center w-100 me-auto fs-4'>
            <Link className='link-warning text-decoration-none pe-3' to="/breads">Blessed Breads</Link>
            <Navbar.Brand className='d-none d-md-block'>
              <Link to="/">
                <Image src='logo.png' width={"120px"}/>
              </Link>
            </Navbar.Brand>
            <Link className='link-secondary text-decoration-none pe-3' to="/sweets">Divine Sweets</Link>
            <div className='d-none d-md-block' style={{borderRight: "1px solid #ffffffaa", height: "30px"}}></div>
            <Link to="/coffees" className='ps-0 pe-2 ps-lg-3 text-decoration-none link-light'>
              <FontAwesomeIcon icon={faMugHot} style={{color: "#ffffffde"}} />
              <span className='ps-1'>Coffees</span>
            </Link>
          </Nav>

          <Nav className='align-items-center'>
            <Link to="/my_products" className='d-none d-lg-block pe-4 text-decoration-none text-center position-relative'>
              <FontAwesomeIcon icon={faStore} style={{color: "rgba(200, 98, 109, 0.9)", height: "1.5rem"}}/>
              <span className='card d-inline text-white rounded-circle px-1 position-absolute top-0 end-0 me-3' style={{backgroundColor: "transparent", border: "2px solid #ffffff", fontSize: "0.7rem"}} >
                {(orders) ? <>
                  {orders.length}
                </>
                :
                "0"
                }
                </span>
              <div className='text-danger text-uppercase fs-5'>Cart</div>
            </Link>
          {
            (token) ?
              <span style={{cursor: 'pointer'}} className='link-secondary text-decoration-none text-uppercase fs-4 pe-2' onClick={handleLogout}>Logout</span>
            :
              <Link className='link-secondary text-decoration-none text-uppercase fs-4 pe-2' to="/login">Login</Link>
            }
          </Nav>

      </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

