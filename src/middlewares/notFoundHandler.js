function notFoundHandler(req, res, next) {
    res.status(404).json({ message: 'Rota não encontrada' });
  }
  
  module.exports = notFoundHandler;
  