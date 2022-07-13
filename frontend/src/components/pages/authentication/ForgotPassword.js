import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import NavBar from '../../NavBar';
import getCookie from '../../CSRFToken';

function SendEmailForm(props) {
  const [email, setEmail] = useState("");

  return (
  <>
    <header>
      <h1>
        Forgot your Password?
      </h1>
    </header>
    <section>
      <p className='fs-5' >Enter your email adress and we'll be send you a link to reset your password</p>
      <div className='d-flex justify-content-center'>
        <label htmlFor='email' className='fs-3 me-2'>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className='form-control w-50 ' placeholder='e.g., bestbakeryinworld@gmail.com...'/>
      </div>
      {(props.isLoading === false) ?
        <button onClick={(e) => props.handleSubmit(email)} className="btn btn-secondary mt-2 text-uppercase fs-4" style={{borderRadius: "30px"}}>Submit</button>
      :
        <button className="btn btn-secondary mt-2 text-uppercase fs-4" style={{borderRadius: "30px"}}>Sending email...</button>
      }
    </section>
  </>
  )
}

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const csrftoken = getCookie('csrftoken');

  function handleSubmit(email) {
    setIsLoading(true)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/accounts/send-reset-password-link/`, {login: email}, {
      headers: {
        "x-csrftoken": csrftoken
      }
    })
    .then(res => {
      setErrors("");
      setEmailSent(true);
    }
    )
    .catch(err => {
      setErrors(Object.values(err.response.data)[0]);
      setIsLoading(false);
    } 
    )
  }

  return (
    <div className='bg-light vh-100'>
      <NavBar />
      <div className='container h-75'>
        <div className='d-flex flex-column align-items-center justify-content-center text-center h-100'>
          {(!emailSent) ? 
            <SendEmailForm handleSubmit={handleSubmit} isLoading={isLoading} />
          :
          <>
            <h2>
              An link was sent to your email in order to reset your password.
            </h2>
            <Link to="/" className='btn btn-primary rounded-pill text-uppercase'>Go to homepage</Link>
          </>
          }
          <span className='mt-2'>{errors}</span>
        </div>
      </div>
    </div>
  )
}
