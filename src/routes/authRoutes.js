const authRoutes = require('express').Router();
const authControllers = require('../controllers/authControllers');

authRoutes.post('/register', authControllers.register);
authRoutes.get('/verify/:token', authControllers.verify);
authRoutes.get('/login', authControllers.login);

module.exports = authRoutes