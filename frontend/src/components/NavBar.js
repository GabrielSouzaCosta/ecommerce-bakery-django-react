import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot, faStore } from '@fortawesome/free-solid-svg-icons';

export default function NavBar () {
  const [token, setToken] = useState("");

  function handleLogout(event) {
    sessionStorage.removeItem('token');
    setToken(sessionStorage.getItem('token'));
  }

  useEffect(() => {
    setToken(sessionStorage.getItem('token'));
  }, [])

  return (
    <>
    <Navbar bg="dark" sticky="top">
      <Container fluid={true}>
          <Nav className='justify-content-center align-items-center w-100 me-auto fs-4'>
            <Link className='link-warning text-decoration-none pe-3' to="/breads">Blessed Breads</Link>
            <Navbar.Brand>
              <Link to="/">
                <Image src='logo.png' width={"120px"}/>
              </Link>
            </Navbar.Brand>
            <Link className='link-secondary text-decoration-none pe-3' to="/sweets">Divine Sweets</Link>
            <div style={{borderRight: "1px solid #ffffffaa", height: "30px"}}></div>
            <Link to="/coffees" className='ps-3 text-decoration-none link-light'>
              <FontAwesomeIcon icon={faMugHot} style={{color: "#ffffffde"}} />
              <span className='ps-1'>Coffees</span>
            </Link>
          </Nav>

          {
            (token) ?
            <Nav className='align-items-center'>
              <Link to="/my_products" className='pe-4 text-decoration-none text-center'>
                <FontAwesomeIcon icon={faStore} style={{color: "rgba(200, 98, 109, 0.9)", height: "1.5rem"}}/>
                <div className='text-danger text-uppercase fs-5'>Shop</div>
              </Link>
              <a style={{cursor: 'pointer'}} className='link-secondary text-decoration-none text-uppercase fs-4 pe-2' onClick={handleLogout}>Logout</a>
            </Nav>
            :
            <Nav>
              <Link className='link-secondary text-decoration-none text-uppercase fs-4 pe-2' to="/login">Login</Link>
            </Nav>
          }

      </Container>
    </Navbar>
    </>
  )
}

