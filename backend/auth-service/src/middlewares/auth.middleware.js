const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

exports.authenticateToken = (req, res, next) => {
  // Obtener el token del header de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Se requiere autenticación' });
  }
  
  // Verificar el token
  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    
    // Guardar datos del usuario en la solicitud para uso posterior
    req.user = user;
    next();
  });
};
