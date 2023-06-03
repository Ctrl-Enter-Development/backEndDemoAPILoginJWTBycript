

// src/controllers/userController.js
const { createUser, getUserByEmail } = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

async function signup(req, res) {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const hashedPassword = await hashPassword(password);
    const userId = await createUser(userName, email, hashedPassword);

    res.status(201).json({ message: 'Usuário criado com sucesso', userId });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = generateToken({ id: user.id });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

module.exports = {
  signup,
  login,
};
