import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from "react-router-dom";
import getCookie from '../../CSRFToken';

export default function Activation() {
  const [msg, setMsg] = useState("");
  const csrftoken = getCookie('csrftoken');
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios.post('/accounts/verify-registration/', 
      {
      "user_id": searchParams.get('user_id'),
      "timestamp": searchParams.get('timestamp'),
      "signature": searchParams.get('signature')
      },

      {headers: {
        "x-csrftoken": csrftoken
      }}
    )
    .then(res => { 
      if (res.status === 200) {
      setMsg("Your account was successfully verified! ")
      } else {
      setMsg("Your link is invalid or your account was already verified.")
        }
      }
    )
  })  

  return (
    <div className='bg-danger text-center text-white'>
      <div className='d-flex flex-column align-items-center justify-content-center w-100 vh-100'>
        <h1>{msg}</h1>
        <Link to="/login" className='btn btn-primary text-uppercase fs-3'>Log in</Link>
      </div>
    </div>
  )
}
