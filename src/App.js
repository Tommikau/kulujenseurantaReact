import React, { useState,useEffect } from 'react'
import { BrowserRouter as Router,Link, Route, Routes } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import Home from './Home'
import KulutLista from './KulutLista'
import Kaaviot from './Kaaviot'
import RekisteröintiForm from './Rekisteröinti'

const App = () => {
  const [loggedInUser, setLoggedinUser] = useState('')
  
  const logout= () =>{
    localStorage.clear()
    setLoggedinUser('')
    window.location.href = '/'

  }
  
  useEffect(()=>{
    let stoderUser = localStorage.getItem("username")
    if(stoderUser !== null){
      setLoggedinUser('stoderUser')
    }
  },[])
  return (
    <Router>
      {loggedInUser ? (
        <div>
          {/* Navbar and other components for logged-in users */}
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
        // Show only the Login component for non-logged-in users
        <Routes>
          <Route path='/' element={<Login setLoggedinUser={setLoggedinUser} />} />
          <Route path="/Rekisteröinti" element={<RekisteröintiForm />} />
        </Routes>
      )}
    </Router>
  );
}

export default App
