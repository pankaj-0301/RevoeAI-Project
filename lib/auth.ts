import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/api';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { token } = response.data;
    Cookies.set('token', token);
    return token;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { email, password });
    const { token } = response.data;
    Cookies.set('token', token);
    return token;
  } catch (error) {
    throw new Error('Registration failed');
  }
};

export const logout = () => {
  Cookies.remove('token');
};

export const getToken = () => {
  return Cookies.get('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};