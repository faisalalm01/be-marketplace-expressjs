const mainRoutes = require('express').Router();
const sampleRoutes = require('./exampleRoutes');
const authRoutes = require('./authRoutes');
const marketRoutes = require('./marketRoutes');

// sample route
mainRoutes.use('/sample', sampleRoutes);

// route
mainRoutes.use('/auth', authRoutes);
mainRoutes.use('/market', marketRoutes);

module.exports = mainRoutes;