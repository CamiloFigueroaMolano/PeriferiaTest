const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { AppDataSource } = require('../data-source');
const { authenticateToken } = require('../middlewares/auth.middleware');

const userRepository = AppDataSource.getRepository('User');

// Ruta protegida - Obtener perfil del usuario
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // req.user contiene los datos del token JWT
    const user = await userRepository.findOneBy({ id: req.user.id });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // No enviar la contraseña
    const { password, ...userWithoutPassword } = user;
    
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', authenticateToken, userController.getProfile);

// Perfil público de otro usuario por ID
router.get('/id/:id', authenticateToken, userController.getProfileById);

// Perfil público de otro usuario por username
router.get('/username/:username', authenticateToken, userController.getProfileByUsername);

module.exports = router;