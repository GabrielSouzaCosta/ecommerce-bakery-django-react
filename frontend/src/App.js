import './App.scss';
import { Routes, Route} from "react-router-dom";
import Home from './components/pages/Home';
import Breads from './components/pages/Breads';
import Sweets from './components/pages/Sweets';
import Login from './components/pages/Login.js';
import Register from './components/pages/Register';

function App() {
  return (
    <>
    <Routes>
      <Route path="/"  element={ <Home /> }/>
      <Route path='/breads' element={ <Breads /> } />
      <Route path='/sweets' element={ <Sweets /> } />
      <Route path='/login' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />
    </Routes>
    </>
  )
}

export default App;
