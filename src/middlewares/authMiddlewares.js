// src/middlewares/authMiddleware.js
const { verifyToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
   
    return res.status(401).json({ message: 'Token inválido' });
}

req.userId = decoded.id;
next();
}
module.exports = authMiddleware;
