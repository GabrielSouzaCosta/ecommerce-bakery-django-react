import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import ApiService from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/slices/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave, faCreditCard} from '@fortawesome/free-solid-svg-icons'

function PaymentOptions(props) {
  return (<>
    <div className="form-check text-start mx-auto w-75" value={props.paymentMethodOption} onChange={props.handleOptionChange} >
      <input className="form-check-input" type="radio" value="cash" name="flexRadioDefault" id="flexRadioDefault1" required/>
      <label className="form-check-label text-start" htmlFor="flexRadioDefault1">
        <FontAwesomeIcon icon={faMoneyBillWave} className="text-success" />
        <span className='ps-1 text-muted'>Cash</span>
        {(props.paymentMethodOption === "cash") ?
          <p className='mb-0 text-success'>
            The payment will be done on the act of delivery
          </p>
        :
          ""
        }
      </label>
    </div>
    <div className="form-check text-start mx-auto w-75" onChange={props.handleOptionChange}>
      <input className="form-check-input" type="radio" value="card" name="flexRadioDefault" id="flexRadioDefault2" />
      <label className="form-check-label" htmlFor="flexRadioDefault2">
        <FontAwesomeIcon icon={faCreditCard} className="text-danger"/>
        <span className='ps-1 text-muted'>Credit or Debit Card</span>
      </label>
    </div>
  </>
  )
}

export default function Checkout(props) {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

    const [paymentMethodOption, setPaymentMethodOption] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    const orders = useSelector((state) => [state.cart.orders]);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (paymentMethodOption === 'card') {

        const card = elements.getElement(CardElement);
        setButtonLoading(true);
        
        const { paymentMethod } = await stripe.createPaymentMethod({
          billing_details: {address: {city: city, line1: address, postal_code: zipcode}},
          type: 'card',
          card: card,
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
      } else {
        dispatch(clearCart());
        navigate("/purchase_successful");
      }  
    }
    


    function getTotal() {
      var total = 0;
      orders[0].forEach((order) => {
        total += order.price * order.quantity
      })
      return total.toFixed(2)
    }

    function handleChange (event) {
      if (event.error) {
        setError(event.error.message);
      } else {
        setError(null);
      }
    }

    function handleOptionChange(event) {
      setPaymentMethodOption(event.target.value)
    }

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/login');
        }
    })

  return (
    <div className='bg-checkout'>
      <div style={{backdropFilter: "blur(3px)"}}>
        <Container className='min-vh-100'  >
          <div className='d-flex align-items-center justify-content-center h-100 pt-4' >
            <Card className='text-center my-5 text-uppercase' style={{width: '700px', backgroundColor: "#ffffffee"}} >
              <Card.Body>
                <Card.Title as='h1' className='text-uppercase'>Checkout</Card.Title>
                <hr></hr>
                <form onSubmit={handleSubmit} className="stripe-form" >
                  <div className='row'>
                    <h2>Products</h2>
                    {orders[0].map((order) => {
                      return (
                        <div className='col-12 me-auto my-1 text-start'>
                          <span>
                            {order.name} | ({order.quantity}) x {order.price} = ${(order.price * order.quantity).toFixed(2)}
                          </span>
                          <hr className='py-0 my-0'></hr>
                        </div>
                      )
                    })}
                    <h4 className='text-start'>Total: ${getTotal()}</h4>

                    <h2>Shipping</h2>
                    <div className="col-6">
                      <label htmlFor="first-name">First Name*</label>
                      <input id='first-name' className='form-control ms-2' value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                    </div>
                    <div className="col-6">
                      <label htmlFor="last-name">Last Name*</label>
                      <input id='last-name' className='form-control ms-2' value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                    </div>
                    <div className='col-12'>
                      <label htmlFor="email">Email*</label>
                      <input id='email' className='form-control ms-2' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className='col-12 col-md-6 mx-auto'>
                      <label htmlFor="address">Address*</label>
                      <input id='address' className='form-control ms-2' value={address} onChange={(e) => setAddress(e.target.value)} required/>
                    </div>
                    <div className='col-12 col-md-6'>
                      <label htmlFor="zip-code">Zip code*</label>
                      <input id='zip-code' className='form-control ms-2' value={zipcode} onChange={(e) => setZipcode(e.target.value)} required/>
                    </div>
                    <div className='col-12 col-md-6 mx-auto'>
                      <label htmlFor="city">City*</label>
                      <input id='city' className='form-control ms-2' value={city} onChange={(e) => setCity(e.target.value)} required/>
                    </div>
                    <div className='col-12 col-md-6 mx-auto'>
                      <label htmlFor="phone">Phone*</label>
                      <input id='phone' className='form-control ms-2' value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                    </div>
                    <hr className='my-3 mx-auto' style={{width: "97%"}}></hr>
                    <PaymentOptions paymentMethodOption={paymentMethodOption} handleOptionChange={handleOptionChange} />
                    {(paymentMethodOption == "card") ?
                      <>
                        <CardElement id="card-element" className='form-control w-75 mx-auto' style={{border: "2px solid #00000044"}} onChange={handleChange}  options={{ hidePostalCode: true }} />
                        <div className="card-errors mb-3" role="alert">{error}</div>
                      </>
                    :
                      ""
                    }
                  </div>
                  <button type="submit" className={`btn rounded text-uppercase border-0 mt-2 ${(orders[0].length ===0) ? "disabled" : ""}`} style={{backgroundColor: "#52b788"}}>
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
    </div>
  )
}
