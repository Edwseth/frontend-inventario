// src/views/Usuarios/routes/UsuariosRoutes.js
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.get('/usuarios', usuariosController.getUsuarios);
router.put('/usuarios/:username/block', usuariosController.bloquearUsuario);
router.put('/usuarios/:username/enable', usuariosController.habilitarUsuario);
router.put('/usuarios/:username/disable', usuariosController.deshabilitarUsuario);

module.exports = router;