import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import registerService from "./Services/registerService";


const RekisterointiForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [registered, setRegistered] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    
    const MIN_PASSWORD_LENGTH = 8
    
    const handlePasswordConfirmChange = (event) => {
        const confirmPass = event.target.value;
        setPasswordConfirm(confirmPass);
        //Tarkistetaan että salasana on vähintään 8 merkkiä pitkä
        if (confirmPass.length < MIN_PASSWORD_LENGTH) {
          setPasswordError(`Salasanassa tulee olla vähintään ${MIN_PASSWORD_LENGTH} merkkiä ja sisältää vähintään yksi numero`);
        }else if (confirmPass !== password) {
            setPasswordError("Salasana ei täsmää");

        
    }else {
      setPasswordError("");
    }
  }

    const handleUsernameChange = (event) => { setUsername(event.target.value) }

    const handlePasswordChange = (event) => { setPassword(event.target.value) 
      const pass = event.target.value;
      setPassword(pass); 
      if (!isValidPassword(pass)) {
      setPasswordError(`Salasanassa tulee olla vähintään ${MIN_PASSWORD_LENGTH} merkkiä ja sisältää vähintään yksi numero`);
    } else if (passwordConfirm !== pass) {
      setPasswordError("Salasana ei täsmää");
    } else {
      setPasswordError("");
    }
  }
  const isValidPassword = (pass) => {
    // tarkistaa että salasana on vähintään 8 merkkiä pitkä 
    //ja sisältää vähintään yhden numeron 
    const hasMinLength = pass.length >= MIN_PASSWORD_LENGTH;
    const containsNumber = /\d/.test(pass);
    return hasMinLength && containsNumber;
  };
    const handleEmailChange = (event) => { setEmail(event.target.value) }

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (password !== passwordConfirm) {
        setPasswordError("Salasana ei täsmää");
        setPassword("");
        setPasswordConfirm("");
        return;
      } else {
        try {
          // Hash the password before sending it to the server
          const hashedPassword = await hashPassword(password);
    
          // Call the registerUser function from the registerService
          const response = await registerService.registerUser({
            username,
            password: hashedPassword,
            email,
          });
    
          console.log("Rekisteröinti onnistui:", response);
          alert("Rekisteröinti onnistui! Paina ok siirtyäksesi kirjautumiseen");
          setRegistered(true);
        } catch (error) {
          console.error("Rekisteröinti epäonnistui:", error);
        }
      }
    };
    
    const hashPassword = async (plainTextPassword) => {
      return plainTextPassword;
    };
    
    const handleReset = () => {
        setUsername("");
        setPassword("");
        setPasswordConfirm("");
        setEmail("");
    }

    if (registered) {
        return <Navigate to="/" />;
    }

    return (
        <div id="rekisteröinti">
            <h2>Rekisteröinti</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder='username' type="text" value={username} onChange={handleUsernameChange} required />
                <input placeholder='password' type="password" value={password} onChange={handlePasswordChange} required />
                <input placeholder='password' type="password" value={passwordConfirm} onChange={handlePasswordConfirmChange} required />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                <input placeholder='email' type="email" value={email} onChange={handleEmailChange} required />
                <button className='rekisteröintiButton' type="submit">Rekisteröidy</button>
                <button className="resetButton" type='reset' onClick={handleReset}>Tyhjennä</button>
            </form>
        </div>
    )
}

export default RekisterointiForm;
