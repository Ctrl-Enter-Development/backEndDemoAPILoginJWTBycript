// src/routes/userRoutes.js
const express = require('express');
const { signup, login, getUser, AllUsers, updateUser, deleteUser} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', AllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Rota protegida' });
});

module.exports = router;
