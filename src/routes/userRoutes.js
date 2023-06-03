// src/routes/userRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Rota protegida' });
});

module.exports = router;
