// src/utils/bcrypt.js
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  const passwordMatch = await bcrypt.compare(password, hashedPassword);
  return passwordMatch;
}

module.exports = {
  hashPassword,
  comparePassword,
};
