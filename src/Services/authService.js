// authenticationService.js
import axios from 'axios'

const apiUrl = 'http://127.0.0.1:8000/login/'

const authenticate = async (userForAuth) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      
      'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
    };

    const response = await axios.post(apiUrl, userForAuth, { headers })
    const { token, ...userData } = response.data;

    // Store the token in localStorage
    localStorage.setItem('token', token)

    // Return both the token and user data
    return { token, userData }
  } catch (error) {
    throw error;
  }
};

const authenticationService = {
  authenticate,
};

export default authenticationService
