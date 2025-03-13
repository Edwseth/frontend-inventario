// src/views/Usuarios/controller/UsuariosController.js
const usuariosService = require('../services/UsuariosService');

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosService.listarUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al listar usuarios: ' + error.message });
  }
};

const bloquearUsuario = async (req, res) => {
  try {
    const { username } = req.params;
    await usuariosService.bloquearUsuario(username);
    res.status(200).json({ message: 'Usuario bloqueado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al bloquear usuario: ' + error.message });
  }
};

// ... (habilitarUsuario y deshabilitarUsuario)

const habilitarUsuario = async (req, res) => {
  try {
    const { username } = req.params;
    await usuariosService.habilitarUsuario(username);
    res.status(200).json({ message: 'Usuario habilitado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deshabilitarUsuario = async (req, res) => {
  try {
    const { username } = req.params;
    await usuariosService.deshabilitarUsuario(username);
    res.status(200).json({ message: 'Usuario deshabilitado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsuarios,
  bloquearUsuario,
  habilitarUsuario,
  deshabilitarUsuario,
};