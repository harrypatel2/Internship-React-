import axios from 'axios';

// Force localhost 5001 and correct users path
const API_URL = 'http://localhost:5001';

const API = axios.create({
  baseURL: `${API_URL}/api/users`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (data) => {
  try {
    const response = await API.post('/register', {
      name: data.name || data.username,
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await API.post('/verify-otp', {
      email: data.email,
      otp: data.otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await API.post('/login', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateUserDetails = async (data, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await API.put('/profile', data, config);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};