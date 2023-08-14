const marketRoutes = require('express').Router();
const marketControllers = require('../controllers/marketControllers');
const cloudinaryMiddleware = require('../helpers/middleware/cloudinaryMiddleware')
const upploadMiddleware = require('../helpers/middleware/upploadMiddleware')
const authMiddleware = require('../helpers/middleware/authMiddleware')

marketRoutes.post('/',
    upploadMiddleware,
    cloudinaryMiddleware,
    authMiddleware.checkLogin, marketControllers.createMarket
    );
marketRoutes.put('/:id', authMiddleware.checkLogin, marketControllers.editMarket);
marketRoutes.get('/', marketControllers.getAllMarket);
marketRoutes.get('/:id', marketControllers.getMarketById);

module.exports = marketRoutes