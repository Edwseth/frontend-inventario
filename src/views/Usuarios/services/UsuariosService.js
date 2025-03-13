// src/views/Usuarios/services/UsuariosService.js
import axios from '../../../config/axios';

const listarUsuarios = async () => {
  try {
    const response = await axios.get('/api/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    throw error;
  }
};

const bloquearUsuario = async (username) => {
  try {
    await axios.put(`/api/usuarios/${username}/block`);
  } catch (error) {
    console.error('Error al bloquear usuario:', error);
    throw error;
  }
};

const habilitarUsuario = async (username) => {
  try {
    await axios.put(`/api/usuarios/${username}/enable`);
  } catch (error) {
    console.error('Error al habilitar usuario:', error);
    throw error;
  }
};

const deshabilitarUsuario = async (username) => {
  try {
    await axios.put(`/api/usuarios/${username}/disable`);
  } catch (error) {
    console.error('Error al deshabilitar usuario:', error);
    throw error;
  }
};

const UsuariosService = {
  listarUsuarios,
  bloquearUsuario,
  habilitarUsuario,
  deshabilitarUsuario,
};

export default UsuariosService;