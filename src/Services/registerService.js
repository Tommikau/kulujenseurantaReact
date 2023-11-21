import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/register/';

const registerUser = async (userData) => {
  try {
    const response = await axios.post(apiUrl, userData);
    const { token, ...responseData } = response.data;


    return { token, responseData };
  } catch (error) {
    throw error;
  }
};

const registerService = {
  registerUser,
};

export default registerService
