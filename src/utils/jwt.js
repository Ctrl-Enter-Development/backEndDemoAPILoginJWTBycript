// src/utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: '1h',
  });
  return token;
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
};
