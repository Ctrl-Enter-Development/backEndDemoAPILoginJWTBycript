const winston = require('winston');

// Configuração do logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log para o console
    new winston.transports.File({ filename: 'logs.log' }) // Log para arquivo
  ],
  format: winston.format.combine(
    winston.format.timestamp(), // Adiciona timestamps aos logs
    winston.format.json() // Formato JSON para os logs
  )
});

module.exports = logger;
