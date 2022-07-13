import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import ApiService from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';

export default function Checkout(props) {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

    const [buttonLoading, setButtonLoading] = useState(false);

    const orders = useSelector((state) => [state.cart.orders]);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (event) => {
      if (event.error) {
        setError(event.error.message);
      } else {
        setError(null);
      }
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      const card = elements.getElement(CardElement);
      setButtonLoading(true);

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: card
      });

      ApiService.saveStripeInfo({
        first_name: firstName,
        last_name: lastName,
        address: address,
        zipcode: zipcode,
        place: city,
        phone: phone,
        email,
        payment_method_id: paymentMethod.id,
        items: orders[0],
      })
      .then(response => {
        dispatch(clearCart());
        navigate('/purchase_successful');
      }).catch(error => {
        setButtonLoading(false);
        console.log(error)
      })
      setButtonLoading(false);
    };  

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login');
        }
    })

  return (
    <div className='bg-secondary' >
      <Container className='min-vh-100'>
        <div className='d-flex align-items-center justify-content-center h-100 pt-5' >
          <Card className='text-center my-5' style={{width: '700px'}} >
            <Card.Body>
              <Card.Title as='h1'>Checkout</Card.Title>
              <form onSubmit={handleSubmit} className="stripe-form" >
                <label htmlFor="first-name">First Name*</label>
                <input id='first-name' className='form-control ms-2' value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>

                <label htmlFor="last-name">Last Name*</label>
                <input id='last-name' className='form-control ms-2' value={lastName} onChange={(e) => setLastName(e.target.value)} required/>

                <label htmlFor="address">Address*</label>
                <input id='address' className='form-control ms-2' value={address} onChange={(e) => setAddress(e.target.value)} required/>

                <label htmlFor="email">Email*</label>
                <input id='email' className='form-control ms-2' value={email} onChange={(e) => setEmail(e.target.value)} required/>

                <label htmlFor="zip-code">Zip code*</label>
                <input id='zip-code' className='form-control ms-2' value={zipcode} onChange={(e) => setZipcode(e.target.value)} required/>

                <label htmlFor="city">City*</label>
                <input id='city' className='form-control ms-2' value={city} onChange={(e) => setCity(e.target.value)} required/>

                <label htmlFor="phone">Phone*</label>
                <input id='phone' className='form-control ms-2' value={phone} onChange={(e) => setPhone(e.target.value)} required/>

                <h2 className='pt-3'>Payment Information</h2>
                <label htmlFor="card-element" className='text-muted'>Credit or debit card</label> 
                <CardElement id="card-element" className='form-control w-75 mx-auto' style={{border: "2px solid #00000044"}} onChange={handleChange} />
                <div className="card-errors mb-3" role="alert">{error}</div>

                <button type="submit" className="btn btn-success rounded">
                  {(!buttonLoading) ?
                    <span>Submit Payment</span>
                  :
                    <span>Loading...</span>
                  }
                </button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  )
}
