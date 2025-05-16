const { AppDataSource } = require('../data-source');
const userRepository = AppDataSource.getRepository('User');

// Perfil del usuario autenticado
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // No devuelvas la contraseña
    const { password, ...profile } = user;
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Perfil público de cualquier usuario por ID
exports.getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userRepository.findOneBy({ id: parseInt(id) });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // No devuelvas la contraseña
    const { password, ...profile } = user;
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Consultar perfil público por username
exports.getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userRepository.findOneBy({ username });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // No devuelvas la contraseña
    const { password, ...profile } = user;
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
