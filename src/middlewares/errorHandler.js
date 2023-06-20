const logger = require('../../logger');

function errorHandler(err, req, res, next) {
    console.error(err); // Exibe o erro no console para fins de depuração
    if (!res.headersSent) {
        res.status(500).json({ message: 'Erro interno do servidor' });
      }
    logger.error('Erro capturado', { error: err });
    const statusCode = err.status || 500;
    const message = err.message || 'Erro interno do servidor';
  
    res.status(statusCode).json({ message });
  }
  
  module.exports = errorHandler;
  