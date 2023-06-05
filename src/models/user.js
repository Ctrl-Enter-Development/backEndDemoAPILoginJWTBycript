// src/models/user.js
const connect = require('../config/connection');

async function createUser(userName, email, password, profile) {
  const connection = await connect;
  const query = `INSERT INTO users (userName, email, password, profile) VALUES (?, ?, ?, ?)`;
  const [result] = await connection.execute(query, [userName, email, password, profile]);
  return result.insertId;
}

async function getAllUsers() {
  const connection = await connect;
  const query = `SELECT * FROM users`;
  const [rows] = await connection.execute(query);
  return rows;
}

async function getUserByEmail(email) {
  const connection = await connect;
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await connection.execute(query, [email]);
  return rows[0];
}

async function getUserByID(id) {
  const connection = await connect;
  const query = `SELECT * FROM users WHERE id = ?`;
  const [rows] = await connection.execute(query, [id]);
  return rows[0];
}

async function updateUserById(id, userName, email, password, profile) {
  const connection = await connect;

  const query = `UPDATE users SET userName = ?, email = ?, password = ?, profile = ? WHERE id = ?`;
  const [result] = await connection.execute(query, [userName, email, password, profile,id]);
  return result.affectedRows === 1;
}

async function deleteUserByID(id) {
  const connection = await connect;
  const query = `DELETE FROM users WHERE id = ?`;
  const [rows] = await connection.execute(query, [id]);
  return rows[0];
}

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserByID,
  updateUserById,
  deleteUserByID,
};
