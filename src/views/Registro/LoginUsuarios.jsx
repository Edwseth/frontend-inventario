// src/views/Registro/LoginUsuarios.jsx
import React, { useState } from 'react';
import axios from '../../config/axios'; // Importar la instancia configurada
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importar useAuth
import clemenLogo from '../../assets/logos/Clemen.png';
import edwtechLogo from '../../assets/logos/EdwTech.png';
import './LoginUsuarios.css';

const LoginUsuarios = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener la función login del contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar errores previos

    try {
      console.log('Datos enviados:', { username, password }); // Depuración
      const response = await axios.post('/auth/login', {
        username,
        password,
      });

      console.log('Respuesta del backend:', response.data); // Depuración

      // Guardar el token en localStorage
      localStorage.setItem('jwtToken', response.data.token);

      // Guardar el usuario en el contexto y en localStorage
      login({ username, token: response.data.token }); // Asegúrate de pasar el usuario y el token

      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error) {
      setError('Error al iniciar sesión: ' + (error.response?.data?.message || 'Credenciales incorrectas'));
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <img src={clemenLogo} alt="Clemen Laboratorios" className="login-logo" />

      <div className="login-window">
        <h2>Iniciar Sesión</h2>
        {error && <div className="error-message">{error}</div>} {/* Mostrar errores */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>

        <div className="login-footer">
          <img src={edwtechLogo} alt="EdwTech Solutions" className="footer-logo" />
          <p>EdwTech Solutions</p>
        </div>
      </div>
    </div>
  );
};

export default LoginUsuarios;