import logo from './logo.svg';
import './App.css';
import KulutLista from './KulutLista';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'


import { BrowserRouter as Router,  Route, Link, Routes } from 'react-router-dom'


const App=()=> {

  return(
  <div>
<Router>
  <Navbar bg="dark" variant="dark">
  <Nav className="mr-auto">
    <Link to={'/'} className='nav-link'>Home</Link>
      <Link to={'/KulutLista'} className='nav-link'>Kulut</Link>
  </Nav>
</Navbar>


  <Routes>

      <Route path="/KulutLista" element={<KulutLista/>}/>
     
  </Routes>
</Router>
</div>
  )
}


export default App
