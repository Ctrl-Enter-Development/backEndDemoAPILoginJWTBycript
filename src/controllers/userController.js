

// src/controllers/userController.js
const { createUser, getUserByEmail,getUserByID, getAllUsers, updateUserById, deleteUserByID} = require('../models/user');
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

async function AllUsers(req, res) {

  try {
    const users = await getAllUsers();
    if (!users) {
      return res.status(404).json({ message: 'Nenhum usário encontrado' });
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
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }  
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { userName, email, password } = req.body;

  try {
    const user = await getUserByID(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (email !== user.email) {
      const existingUserByEmail = await getUserByEmail(email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: 'O email já está em uso' });
      }
    }

    const hashedPassword = await hashPassword(password);

    // Verifique se o email não está sendo usado por outro usuário além do usuário atual
    const otherUsersWithSameEmail = await getUserByEmail(email);
    if (otherUsersWithSameEmail && otherUsersWithSameEmail.id !== id) {
      return res.status(400).json({ message: 'O email já está em uso' });
    }

    const updated = await updateUserById(id, userName, email, hashedPassword);
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
    if (!existingUser) {

      return res.status(404).json({ message: 'Usuário não existe' });
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
