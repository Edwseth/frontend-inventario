// src/views/Registro/Registro.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../config/axios'; // Importar la instancia configurada
import './Registro.css'; // Estilos para el formulario

const Registro = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    role: 'ROLE_USER', // Valor por defecto
  });

  const [mensajeExito, setMensajeExito] = useState(''); // Estado para el mensaje de éxito
  const [error, setError] = useState(''); // Estado para el mensaje de error

  const { isAdmin } = useAuth(); // Obtener la función isAdmin del contexto de autenticación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiar mensajes de error previos
    setMensajeExito(''); // Limpiar mensajes de éxito previos

    // Verificar si el usuario actual es un administrador
    if (!isAdmin()) {
      setError('Solo los administradores pueden registrar nuevos usuarios.');
      return; // Detener la ejecución si el usuario no es administrador
    }

    try {
      const response = await axios.post('/auth/register', formData);
      
      // Mostrar mensaje de éxito
      setMensajeExito(`Usuario registrado exitosamente. ID: ${response.data.userId}`);
      
      // Limpiar el formulario después del registro
      setFormData({
        username: '',
        password: '',
        email: '',
        name: '',
        role: 'ROLE_USER',
      });

      // Limpiar el mensaje de éxito después de 5 segundos (opcional)
      setTimeout(() => {
        setMensajeExito('');
      }, 5000);

    } catch (error) {
      if (error.response?.status === 409) {
        // Manejar el error 409 (Conflicto)
        setError(error.response.data.message || 'El nombre de usuario o correo electrónico ya está en uso.');
      } else {
        // Manejar otros errores
        setError('Error al registrar el usuario. Inténtalo de nuevo.');
      }
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="registro-container">
      <h1>Registro de Usuarios</h1>
      <p>Aquí puedes gestionar los registros de usuarios.</p>

      {/* Mostrar mensaje de éxito */}
      {mensajeExito && (
        <div className="mensaje-exito">
          {mensajeExito}
        </div>
      )}

      {/* Mostrar mensaje de error */}
      {error && (
        <div className="mensaje-error">
          {error}
        </div>
      )}

      {/* Formulario de registro */}
      <form onSubmit={handleSubmit} className="registro-form">
        <div className="form-group">
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingrese el nombre de usuario"
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingrese la contraseña"
            required
          />
        </div>
        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingrese el correo electrónico"
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingrese el nombre completo"
            required
          />
        </div>
        <div className="form-group">
          <label>Rol:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="ROLE_USER">Usuario</option>
            <option value="ROLE_ADMIN">Administrador</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Registrar Usuario
        </button>
      </form>
    </div>
  );
};

export default Registro;
