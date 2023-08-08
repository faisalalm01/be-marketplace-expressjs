const mainRoutes = require('express').Router();
const sampleRoutes = require('./exampleRoutes');
const authRoutes = require('./authRoutes');

// sample route
mainRoutes.use('/sample', sampleRoutes);

// route
mainRoutes.use('/auth', authRoutes);

module.exports = mainRoutes;