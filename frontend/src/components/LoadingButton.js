import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Form';
import { useNavigate} from 'react-router-dom';

export default function LoadingButton(props) {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isLoading) {
        props.handleAuthentication().then((res) => {
          setLoading(false);
          sessionStorage.setItem('token', res.data.auth_token)
          if (res.status === 200) {
            navigate('/')
          }
        })
        .catch((err) => {
          setLoading(false);
          props.handleMsgChange( Object.values(err.response.data)[0] )
        });
      }
    }, [isLoading]);
  
    const handleClick = () => setLoading(true);
  
    return (
      <Button
        className='btn btn-primary d-block w-50 m-auto my-2'
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
        >
        {isLoading ? 'Loading…' : props.type}
      </Button>
    );
  }