// src/views/Usuarios/Usuarios.jsx
import React, { useState, useEffect } from 'react';
import usuariosService from './services/UsuariosService';
import listarIcon from '../../assets/icons/listar.png';
import bloquearIcon from '../../assets/icons/bloquear.png';
import habilitarIcon from '../../assets/icons/habilitar.png';
import deshabilitarIcon from '../../assets/icons/deshabilitar.png';
import './Usuarios.css';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
  const [accion, setAccion] = useState(null); // Subfunción seleccionada (inicialmente null)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null); // Usuario seleccionado para acciones

  // Cargar la lista de usuarios solo cuando se seleccione "listar"
  useEffect(() => {
    if (accion === 'listar') {
      cargarUsuarios();
    }
  }, [accion]);

  const cargarUsuarios = async () => {
    try {
      const usuarios = await usuariosService.listarUsuarios();
      setUsuarios(usuarios);
      console.log('Lista de usuarios cargada:', usuarios); // Log para depuración
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleBloquearUsuario = async () => {
    if (!usuarioSeleccionado) {
      alert('Por favor, selecciona un usuario');
      return;
    }

    try {
      await usuariosService.bloquearUsuario(usuarioSeleccionado.username);
      cargarUsuarios();
      setUsuarioSeleccionado(null);
      alert('Usuario bloqueado exitosamente');
    } catch (error) {
      console.error('Error al bloquear usuario:', error);
    }
  };

  const handleHabilitarUsuario = async () => {
    if (!usuarioSeleccionado) {
      alert('Por favor, selecciona un usuario');
      return;
    }

    try {
      await usuariosService.habilitarUsuario(usuarioSeleccionado.username);
      cargarUsuarios();
      setUsuarioSeleccionado(null);
      alert('Usuario habilitado exitosamente');
    } catch (error) {
      console.error('Error al habilitar usuario:', error);
    }
  };

  const handleDeshabilitarUsuario = async () => {
    if (!usuarioSeleccionado) {
      alert('Por favor, selecciona un usuario');
      return;
    }

    try {
      await usuariosService.deshabilitarUsuario(usuarioSeleccionado.username);
      cargarUsuarios();
      setUsuarioSeleccionado(null);
      alert('Usuario deshabilitado exitosamente');
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
                <th>Nombre</th>
                  <th>Nombre de Usuario</th>
                  <th>Correo Electrónico</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.name}</td>
                    <td>{usuario.username}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {accion === 'bloquear' && (
          <div className="formulario-accion">
            <h2>Bloquear Usuario</h2>
            <select
              value={usuarioSeleccionado ? usuarioSeleccionado.username : ''}
              onChange={(e) => {
                const username = e.target.value;
                console.log('Usuario seleccionado (username):', username); // Log para depuración
                const usuario = usuarios.find((u) => u.username === username);
                console.log('Usuario encontrado:', usuario); // Log para depuración
                setUsuarioSeleccionado(usuario);
              }}
            >
              <option value="">Selecciona un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.username} value={usuario.username}>
                  {usuario.username}
                </option>
              ))}
            </select>
            <button onClick={handleBloquearUsuario}>Bloquear</button>
          </div>
        )}

        {accion === 'habilitar' && (
          <div className="formulario-accion">
            <h2>Habilitar Usuario</h2>
            <select
              value={usuarioSeleccionado ? usuarioSeleccionado.username : ''}
              onChange={(e) => {
                const username = e.target.value;
                console.log('Usuario seleccionado (username):', username); // Log para depuración
                const usuario = usuarios.find((u) => u.username === username);
                console.log('Usuario encontrado:', usuario); // Log para depuración
                setUsuarioSeleccionado(usuario);
              }}
            >
              <option value="">Selecciona un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.username} value={usuario.username}>
                  {usuario.username}
                </option>
              ))}
            </select>
            <button onClick={handleHabilitarUsuario}>Habilitar</button>
          </div>
        )}

        {accion === 'deshabilitar' && (
          <div className="formulario-accion">
            <h2>Deshabilitar Usuario</h2>
            <select
              value={usuarioSeleccionado ? usuarioSeleccionado.username : ''}
              onChange={(e) => {
                const username = e.target.value;
                console.log('Usuario seleccionado (username):', username); // Log para depuración
                const usuario = usuarios.find((u) => u.username === username);
                console.log('Usuario encontrado:', usuario); // Log para depuración
                setUsuarioSeleccionado(usuario);
              }}
            >
              <option value="">Selecciona un usuario</option>
              {usuarios.map((usuario) => (
                <option key={usuario.username} value={usuario.username}>
                  {usuario.username}
                </option>
              ))}
            </select>
            <button onClick={handleDeshabilitarUsuario}>Deshabilitar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usuarios;