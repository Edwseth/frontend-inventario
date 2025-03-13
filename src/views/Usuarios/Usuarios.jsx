// src/views/Usuarios/Usuarios.jsx
import React, { useState, useEffect } from 'react';
import usuariosService from './services/UsuariosService';
import listarIcon from '../../assets/icons/listar.png';
import bloquearIcon from '../../assets/icons/bloquear.png';
import habilitarIcon from '../../assets/icons/habilitar.png';
import deshabilitarIcon from '../../assets/icons/deshabilitar.png';
import './Usuarios.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [accion, setAccion] = useState(null);

  // Cargar la lista de usuarios al montar el componente
  useEffect(() => {
    if (accion === 'listar') {
      cargarUsuarios();
    }
  }, [accion]);

  const cargarUsuarios = async () => {
    try {
      const usuarios = await usuariosService.listarUsuarios();
      setUsuarios(usuarios);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleBloquearUsuario = async (id) => {
    try {
      await usuariosService.bloquearUsuario(id);
      cargarUsuarios(); // Recargar la lista de usuarios
    } catch (error) {
      console.error('Error al bloquear usuario:', error);
    }
  };

  const handleHabilitarUsuario = async (id) => {
    try {
      await usuariosService.habilitarUsuario(id);
      cargarUsuarios(); // Recargar la lista de usuarios
    } catch (error) {
      console.error('Error al habilitar usuario:', error);
    }
  };

  const handleDeshabilitarUsuario = async (id) => {
    try {
      await usuariosService.deshabilitarUsuario(id);
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
        {accion === null && (
          <div className="mensaje-inicial">
            <h2>Bienvenido a la Gestión de Usuarios</h2>
            <p>Selecciona una acción para comenzar.</p>
          </div>
        )}

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
