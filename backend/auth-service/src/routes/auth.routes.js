const express = require('express');
const router = express.Router();
const { AppDataSource } = require('../data-source');
const bcrypt = require('bcryptjs');
const authController = require('../controllers/auth.controller'); // Añade esta línea

// Acceso al repositorio de usuarios
const userRepository = AppDataSource.getRepository('User');

// Ruta para registrar usuarios
router.post('/register', authController.register);

// Ruta para login
router.post('/login', authController.login);

module.exports = router;
