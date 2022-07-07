import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Form';

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

export default function LoadingButton(props) {
    const [isLoading, setLoading] = useState(false);
  
    useEffect(() => {
      if (isLoading) {
        simulateNetworkRequest().then(() => {
          setLoading(false);
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