const marketRoutes = require('express').Router();
const marketControllers = require('../controllers/marketControllers');
const authMiddleware = require('../helpers/middleware/authMiddleware')

marketRoutes.post('/', authMiddleware.checkLogin, marketControllers.createMarket);
marketRoutes.get('/', marketControllers.getAllMarket);
marketRoutes.put('/:id', marketControllers.editMarket)

module.exports = marketRoutes