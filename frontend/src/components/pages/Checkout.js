import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function Checkout() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login');
        }
    })

  return (
    <div>Checkout</div>
  )
}
