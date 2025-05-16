
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppDataSource } = require('../data-source');
const jwtConfig = require('../config/jwt.config');

const userRepository = AppDataSource.getRepository('User');

exports.register = async (req, res) => {
  try {
    const { username, password, name, lastname, birthday } = req.body;
    if (!username || !password || !name || !lastname || !birthday) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    const existing = await userRepository.findOneBy({ username });
    if (existing) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = userRepository.create({ 
      username, 
      password: hashed,
      name,
      lastname,
      birthday
    });
    await userRepository.save(user);
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Validación de campos
    if (!username || !password) {
      return res.status(400).json({ error: 'Username y password son requeridos' });
    }

    // Buscar el usuario por username
    const user = await userRepository.findOneBy({ username });
    
    // Verificar si el usuario existe
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      jwtConfig.secret, 
      { expiresIn: jwtConfig.expiresIn }
    );
    
    // Responder con el token y los datos del usuario (excepto la contraseña)
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({
      user: userWithoutPassword,
      token
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
