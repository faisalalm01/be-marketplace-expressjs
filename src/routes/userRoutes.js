const userRoutes = require('express').Router();
const userControllers = require('../controllers/userControllers');
const authMiddleware = require('../helpers/middleware/authMiddleware')


userRoutes.get('/', authMiddleware.checkLogin, userControllers.getDataUser);
userRoutes.get('/product', authMiddleware.checkLogin, userControllers.getUserProduct);

module.exports = userRoutes