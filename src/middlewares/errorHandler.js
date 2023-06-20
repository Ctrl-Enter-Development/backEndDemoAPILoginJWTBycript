const logger = require('../../logger');

function errorHandler(err, req, res, next) {
    console.error(err); // Exibe o erro no console para fins de depuração
    logger.error('Erro capturado', { error: err });
    const statusCode = err.status || 500;
    const message = err.message || 'Erro interno do servidor';
  
    res.status(statusCode).json({ message });
  }
  
  module.exports = errorHandler;
  