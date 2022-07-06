import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';

export default function Products(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let response = await axios.get('products?format=json').then(res => setProducts(res.data));
    }
    setProducts(getProducts());
  }, [])

  return (
  <>
    <div className='bg-light min-vh-100'>
      <NavBar />
      {(Object.keys(products).length !== 0) ? 
        <>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <img src={product.get_thumbnail} />
                {product.name}
                {product.description}
              </div>
              )
          })} 
        </>
          :
          ""
      }
    </div>
  </>
  )
}
