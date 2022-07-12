import './App.scss';
import { Routes, Route} from "react-router-dom";
import Home from './components/pages/Home';
import Breads from './components/pages/Breads';
import Sweets from './components/pages/Sweets';
import Coffees from './components/pages/Coffees';
import Login from './components/pages/authentication/Login.js';
import Register from './components/pages/authentication/Register';
import Activation from './components/pages/authentication/Activation';
import ForgotPassword from './components/pages/authentication/ForgotPassword';
import ResetPassword from './components/pages/authentication/ResetPassword';
import MyProducts from './components/pages/MyProducts';
import Checkout from './components/pages/Checkout';
import PurchaseSuccessful from './components/pages/PurchaseSuccessful';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import RegisterSuccess from './components/pages/authentication/RegisterSuccess';

const stripePromise = loadStripe('pk_test_51LJLNUGxJkyAp9vF7BGyoTHsXo1bnc5aThhQXD6dFQ2g9meSjBmM4CSa1RoWRfoxf0ZqrTkprlyPqp7orVlC51Hc005V13khXB', {
  locale: 'en'}
  )

function App() {
  
  return (
    <>
    <Routes>
      <Route path="/"  element={ <Home /> }/>
      <Route path='/breads' element={ <Breads /> } />
      <Route path='/sweets' element={ <Sweets /> } />
      <Route path='/coffees' element={ <Coffees /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />
      <Route path='/register-success' element={ <RegisterSuccess /> } />
      <Route path='/verify-user' element={ <Activation /> }/>
      <Route path='/forgot-password' element={ <ForgotPassword /> }/>
      <Route path='/reset-password' element={ <ResetPassword /> } />
      <Route path='/my_products' element={ <MyProducts />} />
      <Route path='/checkout' 
      element={
        <Elements stripe={stripePromise} >
          <Checkout /> 
        </Elements>
         } />
      <Route path="/purchase_successful" element={ <PurchaseSuccessful /> } />
    </Routes>
    </>
  )
}

export default App;
