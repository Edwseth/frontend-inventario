// src/services/authService.js
import axios from 'axios';

export const login = async (credentials) => {
  const response = await axios.post('/api/auth/login', credentials);
  const token = response.data.token; // Asume que el token viene en response.data.token
  localStorage.setItem('jwtToken', token); // Guarda el token en localStorage
  return response.data;
};