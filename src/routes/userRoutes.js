// src/routes/userRoutes.js
const express = require('express');
const { signup, login, getUser, AllUsers, updateUser, deleteUser} = require('../controllers/userController');
const { authMiddleware, adminOnly } = require('../middlewares/authMiddlewares');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const logger = require('../../logger');

router.post('/signup', [
  // O userName não deve ser vazio
  check('userName').not().isEmpty().withMessage('O nome de usuário é obrigatório'),
  // O email deve ser válido
  check('email').isEmail().withMessage('Digite um e-mail válido'),
  // A senha deve ter pelo menos 5 caracteres
  check('password').isLength({ min: 5 }).withMessage('A senha deve ter pelo menos 5 caracteres'),
  // O perfil deve ser 'admin' ou 'user'
  check('profile').isIn(['admin', 'user']).withMessage('O perfil deve ser "admin" ou "user"')
  
], authMiddleware, adminOnly, signup);

router.post('/login', (req, res) => {
  logger.info('Rota de login foi chamada', { requestBody: req.body });

  login(req, res);
});
router.get('/users',authMiddleware, AllUsers);

router.get('/user/:id',authMiddleware,adminOnly,getUser);

router.put('/user/:id', [
  // O userName não deve ser vazio
  check('userName').not().isEmpty().withMessage('O nome de usuário é obrigatório'),
  // O email deve ser válido
  check('email').isEmail().withMessage('Digite um e-mail válido'),
  // A senha deve ter pelo menos 5 caracteres
  check('password').isLength({ min: 5 }).withMessage('A senha deve ter pelo menos 5 caracteres'),
  // O perfil deve ser 'admin' ou 'user'
  check('profile').isIn(['admin', 'user']).withMessage('O perfil deve ser "admin" ou "user"')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
},authMiddleware,adminOnly, updateUser);

router.delete('/user/:id', authMiddleware,adminOnly,deleteUser);

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Rota protegida' });
});

router.get('/admin', authMiddleware, adminOnly, (req, res) => {
  res.json({ message: 'Rota apenas para administradores' });
});

module.exports = router;
