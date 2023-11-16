import logo from './logo.svg';
import './App.css';
import KulutLista from './KulutLista';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Kaaviot from './Kaaviot';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css'


import { BrowserRouter as Router,  Route, Link, Routes } from 'react-router-dom'


const App=()=> {

  return(
    
  <div>
<Router>
  <Navbar bg="dark" variant="dark">
  <Nav className="mr-auto">
    <Link to={'./'} className='nav-link'>Home</Link>
    <Link to={'/KulutLista'} className='nav-link'>Kulut</Link>
    <Link to={'/Kaaviot'} className='nav-link'>Kaaviot</Link>

  </Nav>
</Navbar>


  <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path="/KulutLista" element={<KulutLista/>}/>
     
      <Route path="/Kaaviot" element={<Kaaviot/>}/>
  </Routes>
</Router>
</div>
  )
}


export default App
