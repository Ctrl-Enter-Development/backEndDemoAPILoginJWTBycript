// Criar chave secreta para o jwt
// const crypto = require('crypto');

// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log('Chave secreta:', secretKey);

// src/index.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
