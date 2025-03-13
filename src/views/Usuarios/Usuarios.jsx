// src/views/Usuarios/Usuarios.jsx
import React, { useState, useEffect } from 'react';
import axios from '../../config/axios'; // Importar la instancia configurada
import listarIcon from '../../assets/icons/listar.png'; // Ícono de listar
import bloquearIcon from '../../assets/icons/bloquear.png'; // Ícono de bloquear
import habilitarIcon from '../../assets/icons/habilitar.png'; // Ícono de habilitar
import deshabilitarIcon from '../../assets/icons/deshabilitar.png'; // Ícono de deshabilitar
import './Usuarios.css'; // Estilos para la vista de usuarios

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [accion, setAccion] = useState('listar'); // Subfunción seleccionada

  // Cargar la lista de usuarios al montar el componente
  useEffect(() => {
    if (accion === 'listar') {
      cargarUsuarios();
    }
  }, [accion]);

  const cargarUsuarios = async () => {
    try {
      const response = await axios.get('/api/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleBloquearUsuario = async (id) => {
    try {
      await axios.put(`/api/usuarios/${id}/bloquear`);
      cargarUsuarios(); // Recargar la lista de usuarios
    } catch (error) {
      console.error('Error al bloquear usuario:', error);
    }
  };

  const handleHabilitarUsuario = async (id) => {
    try {
      await axios.put(`/api/usuarios/${id}/habilitar`);
      cargarUsuarios(); // Recargar la lista de usuarios
    } catch (error) {
      console.error('Error al habilitar usuario:', error);
    }
  };

  const handleDeshabilitarUsuario = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/usuarios/${id}/deshabilitar`);
      cargarUsuarios(); // Recargar la lista de usuarios
    } catch (error) {
      console.error('Error al deshabilitar usuario:', error);
    }
  };

  return (
    <div className="usuarios-container">
      <h1>Gestión de Usuarios</h1>

      {/* Subfunciones */}
      <div className="subfunciones">
        <div
          className={`subfuncion ${accion === 'listar' ? 'active' : ''}`}
          onClick={() => setAccion('listar')}
        >
          <img src={listarIcon} alt="Listar Usuarios" />
          <p>Listar Usuarios</p>
        </div>
        <div
          className={`subfuncion ${accion === 'bloquear' ? 'active' : ''}`}
          onClick={() => setAccion('bloquear')}
        >
          <img src={bloquearIcon} alt="Bloquear Usuario" />
          <p>Bloquear Usuario</p>
        </div>
        <div
          className={`subfuncion ${accion === 'habilitar' ? 'active' : ''}`}
          onClick={() => setAccion('habilitar')}
        >
          <img src={habilitarIcon} alt="Habilitar Usuario" />
          <p>Habilitar Usuario</p>
        </div>
        <div
          className={`subfuncion ${accion === 'deshabilitar' ? 'active' : ''}`}
          onClick={() => setAccion('deshabilitar')}
        >
          <img src={deshabilitarIcon} alt="Deshabilitar Usuario" />
          <p>Deshabilitar Usuario</p>
        </div>
      </div>

      {/* Contenido de la subfunción seleccionada */}
      <div className="contenido-subfuncion">
        {accion === 'listar' && (
          <div className="lista-usuarios">
            <h2>Lista de Usuarios</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre de Usuario</th>
                  <th>Correo Electrónico</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.role}</td>
                    <td>
                      <button onClick={() => handleBloquearUsuario(usuario.id)}>Bloquear</button>
                      <button onClick={() => handleHabilitarUsuario(usuario.id)}>Habilitar</button>
                      <button onClick={() => handleDeshabilitarUsuario(usuario.id)}>Deshabilitar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {accion === 'bloquear' && (
          <div className="formulario-accion">
            <h2>Bloquear Usuario</h2>
            <p>Selecciona un usuario de la lista para bloquearlo.</p>
          </div>
        )}

        {accion === 'habilitar' && (
          <div className="formulario-accion">
            <h2>Habilitar Usuario</h2>
            <p>Selecciona un usuario de la lista para habilitarlo.</p>
          </div>
        )}

        {accion === 'deshabilitar' && (
          <div className="formulario-accion">
            <h2>Deshabilitar Usuario</h2>
            <p>Selecciona un usuario de la lista para deshabilitarlo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;