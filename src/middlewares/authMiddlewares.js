const { verifyToken } = require('../utils/jwt');
const { getUserByID } = require('../models/user');

async function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  try {
    const user = await getUserByID(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    req.userId = decoded.id;
    req.userProfile = decoded.profile;
    req.user = user;

    next();
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

function adminOnly(req, res, next) {
  if (req.userProfile !== 'admin') {
    return res.status(403).json({ message: 'Acesso não autorizado' });
  }

  next();
}

module.exports = {
  authMiddleware,
  adminOnly
};
