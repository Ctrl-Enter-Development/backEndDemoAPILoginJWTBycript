// Criar chave secreta para o jwt
// const crypto = require('crypto');

// const secretKey = crypto.randomBytes(32).toString('hex');
// console.log('Chave secreta:', secretKey);

// src/index.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('../logger');


require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  res.status(status).send(message);
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
