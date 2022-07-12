import React from 'react'
import NavBar from '../../NavBar'
import { Link } from 'react-router-dom'

export default function RegisterSuccess() {
  return (
      <div className='vh-100 bg-danger text-center text-white'>
        <NavBar />
        <div className='d-flex flex-column align-items-center justify-content-center w-100 h-75'>
        <h1 className='text-uppercase'>Register Success!</h1>
        <h2>An validation email was sent to your email in order to activate your account.</h2>
        <h3><u>If you already activated it: </u></h3>
        <Link to="/login" className='btn btn-primary text-uppercase fs-3'>Log in</Link>
        </div>
    </div>
  )
}
