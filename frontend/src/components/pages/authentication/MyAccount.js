import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../../NavBar';

export default function MyAccount() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get('orders/', {headers: {
      "Authorization": "Token "+sessionStorage.getItem('token')
    }})
    .then(res => setOrders(res.data.map((order) => {
      return {id: order.id, items: order.items, total: order.paid_amount, created_at: order.created_at}
      })));

  }, [])

  return (
    <div className='bg-warning'>
        <NavBar style={{opacity: "0.92"}}/>
        <div className='container pb-4'>
          <h1 className='text-center text-uppercase pt-3 pb-2 text-white  '>My Orders</h1>
          {orders.map(({items, id, total, created_at}, index) => {

            return (
              <div className='card bg-danger border-0 text-white fs-5 px-3 my-2 text-capitalize' style={{borderRadius: "0"}} key={index}>
                <h2 className='text-center pt-2'>Order {id} - {created_at.slice(0,10).split("-").reverse().join("-")} </h2>
                {items.map((item, id) => {
                  return (<div key={id}>
                    <span>{item.product.name} | {item.quantity} x ${item.product.price} = ${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                  )
                })}
                <hr className='mb-0'></hr>
                <span className='fs-4 py-1 text-uppercase'>
                  Total: ${total}
                </span>
              </div>
            )
            })
          }
        </div>
    </div>
  )
}
