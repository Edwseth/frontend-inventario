import axios from 'axios';

// Crear una instancia de Axios con una configuración base
const instance = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto según tu backend
  timeout: 10000, // Tiempo de espera para las solicitudes
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🛠️ Interceptor para incluir el token en las solicitudes
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ⚠️ Interceptor para manejar respuestas con error (401 - No autorizado)
instance.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, continúa
  (error) => {
    if (error.response?.status === 401) {
      // Si el token no es válido o expiró, eliminarlo y redirigir al login
      localStorage.removeItem('jwtToken');
      window.location.href = '/login'; // Redirige al login
    }
    return Promise.reject(error); // Rechazar el error para que el frontend lo maneje
  }
);

export default instance;
