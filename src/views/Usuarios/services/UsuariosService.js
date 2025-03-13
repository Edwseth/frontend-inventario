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

const bloquearUsuario = async (id) => {
  try {
    await axios.put(`/api/usuarios/${id}/block`);
  } catch (error) {
    console.error('Error al bloquear usuario:', error);
    throw error;
  }
};

const habilitarUsuario = async (id) => {
  try {
    await axios.put(`/api/usuarios/${id}/enable`);
  } catch (error) {
    console.error('Error al habilitar usuario:', error);
    throw error;
  }
};

const deshabilitarUsuario = async (id) => {
  try {
    await axios.put(`/api/usuarios/${id}/disable`);
  } catch (error) {
    console.error('Error al deshabilitar usuario:', error);
    throw error;
  }
};

export default {
  listarUsuarios,
  bloquearUsuario,
  habilitarUsuario,
  deshabilitarUsuario,
};