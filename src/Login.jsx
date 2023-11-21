import React, { useState } from 'react';
import authenticationService from './Services/authService';


const LoginForm = ({setLoggedinUser}) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const authenticationResult = await authenticationService.authenticate(credentials);
      const token = authenticationResult.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", credentials.username);
      console.log('Kirjautuminen onnistui:', token);
      setLoggedinUser(credentials.username)

    } catch (error) {
      console.error('Kirjautumisvirhe:', error);
      setLoginError('Virheelliset kirjautumistiedot');
    }
  };

  return (
    <div id='login'>
      <h2>Kirjaudu sisään</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Käyttäjänimi:</label><br></br>
          <input id="username"
            className="input"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salasana:</label><br></br>
          <input id='password'
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button id='loginButton' type="submit">Kirjaudu</button>
        <button id='registerButton' type="button" onClick={() => {
        window.location.href = '/Rekisteröinti';
      }}>
        Rekisteröidy
      </button>
      
      </form>

      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
    </div>
  );
};

export default LoginForm;