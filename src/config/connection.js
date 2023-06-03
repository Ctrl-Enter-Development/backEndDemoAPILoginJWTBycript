// src/config/connection.js
const mysql = require('mysql2/promise');
require('dotenv').config();

async function connect() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('Conexão com o banco de dados estabelecida');
    return connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
}

module.exports = connect().then((connection) => connection);
