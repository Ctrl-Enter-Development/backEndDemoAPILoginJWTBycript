

// src/controllers/userController.js
const { createUser, getUserByEmail,getUserByID, getAllUsers, updateUserById, deleteUserByID} = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');
const logger = require('../../logger');
// depois, suas funções do controlador...


async function signup(req, res) {
  const { userName, email, password, profile } = req.body;
  //  if (!req.user.isAdmin) {
  //    return res.status(403).json({ error: 'Permissão negada. Apenas administradores podem criar usuários.' });
  //  }
// Verifica se há erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    logger.info('Rota de signup foi chamada', { requestBody: req.body });
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new AppError('Usuário já existe', 400);
    }

    const hashedPassword = await hashPassword(password);
    const userId = await createUser(userName, email, hashedPassword, profile);
    logger.info('Usuário criado com sucesso', { userId });
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
      throw new AppError('Usuário não encontrado', 404);
    }

    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Credenciais inválidas', 401);
    }

    const token = generateToken({ id: user.id, profile: user.profile  });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

async function AllUsers(req, res) {

  try {
    const users = await getAllUsers();
    if (!users) {
      throw new AppError('Nenhum usuário encontrado', 404);
    }
    
    return res.status(200).json(users);

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }  
}

async function getUser(req, res) {
  const { id } = req.params;

  try {
    const user = await getUserByID(id);
    if (!user) {
      throw new AppError('Nenhum usuário encontrado', 404);
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }  
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { userName, email, password, profile } = req.body;

  try {
    const user = await getUserByID(id);
    if (!user) {
      throw new AppError('Nenhum usuário encontrado', 404);
    }

    if (email !== user.email) {
      const existingUserByEmail = await getUserByEmail(email);
      if (existingUserByEmail) {
        throw new AppError('Usuário já existe', 400);
      }
    }

    const hashedPassword = await hashPassword(password);

    // Verifique se o email não está sendo usado por outro usuário além do usuário atual
    const otherUsersWithSameEmail = await getUserByEmail(email);
    if (otherUsersWithSameEmail && otherUsersWithSameEmail.id !== id) {
      throw new AppError('O email já está em uso', 404);
    }

    const updated = await updateUserById(id, userName, email, hashedPassword, profile);
    if (!updated) {
      return res.status(500).json({ message: 'Erro ao atualizar o usuário' });
    }

    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}



async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const existingUser = await getUserByID(id);
    if (!existingUser)  {
      throw new AppError('Usuário não existe', 404);
    }
    

    await deleteUserByID(id);
    return res.status(200).json({ message: 'Usuário deletado' });


  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }  
}

module.exports = {
  signup,
  login,
  AllUsers,
  getUser,
  updateUser,
  deleteUser,
  
};
