import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

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
            <Link className='link-secondary text-decoration-none pe-3' to="/breads">Blessed Breads</Link>
            <Navbar.Brand>
              <Link to="/">
                <Image src='logo.png' width={"120px"}/>
              </Link>
            </Navbar.Brand>
            <Link className='link-warning text-decoration-none' to="/sweets">Divine Sweets</Link>
          </Nav>

          {
            (token) ?
            <Nav>
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

