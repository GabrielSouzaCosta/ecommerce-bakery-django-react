import React from 'react';
import NavBar from '../NavBar';
import { Link } from 'react-router-dom';

export default function PurchaseSuccessful() {
  return (
    <div className='bg-secondary vh-100'>
        <NavBar />
        <div className='h-75'>
            <div className='d-flex flex-column justify-content-center align-items-center h-100 text-center'>
                <h1 className='text-white text-uppercase'>
                    Success!
                </h1>
                <h2>
                    We received your purchase request, we'll be in touch shortly!
                </h2>
                <Link to={'/'} className="btn btn-warning text-uppercase rounded-pill fs-4 text-success mt-2">Continue</Link>
            </div>
        </div>
    </div>
  )
}
