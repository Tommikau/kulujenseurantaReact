import React, { useState,useEffect } from 'react';
import { useNavigate, BrowserRouter as Router,Link, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Home from './Home';
import KulutLista from './KulutLista';
import Kaaviot from './Kaaviot';
import RekisterointiForm from './Rekisterointi';

const App = () => {
  const [loggedInUser, setLoggedinUser] = useState('');
  
  
  const logout= () =>{
    localStorage.clear()
    setLoggedinUser('')
    window.location('/')
  }
  
  useEffect(()=>{
    let storedUser = localStorage.getItem("username")
    if(storedUser !== null){
      setLoggedinUser('storedUser')
    }
  },[])
  return (
    <Router>
      {loggedInUser ? (
        <div>
          {/* Navbar ja muut komponenti näytetään kirjautumisen jälkeen */}
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Link to={'/'} className='nav-link'>Home</Link>
              <Link to={'/KulutLista'} className='nav-link'>Kulut</Link>
              <Link to={'/Kaaviot'} className='nav-link'>Kaaviot</Link>
              <Link onClick={logout} className='nav-link'>Logout</Link>
            </Nav>
          </Navbar>

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/KulutLista" element={<KulutLista />} />
            <Route path="/Kaaviot" element={<Kaaviot />} />
          </Routes>
        </div>
      ) : (
        // Ennen kirjautumista näytetään vain login ja rekisteröinti
        <Routes>
          <Route path='/' element={<Login setLoggedinUser={setLoggedinUser} />} />
          <Route path="/Rekisterointi" element={<RekisterointiForm />} />
        </Routes>
      )}
    </Router>
  );
}

export default App
