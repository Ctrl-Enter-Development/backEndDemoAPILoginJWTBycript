// src/models/user.js
const connect = require('../config/connection');

async function createUser(userName, email, password) {
  const connection = await connect;
  const query = `INSERT INTO users (userName, email, password) VALUES (?, ?, ?)`;
  const [result] = await connection.execute(query, [userName, email, password]);
  return result.insertId;
}

async function getUserByEmail(email) {
  const connection = await connect;
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await connection.execute(query, [email]);
  return rows[0];
}

module.exports = {
  createUser,
  getUserByEmail,
};
