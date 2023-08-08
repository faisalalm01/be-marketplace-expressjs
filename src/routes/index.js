const mainRoutes = require('express').Router();
const sampleRoutes = require('./exampleRoutes');

// sample route
mainRoutes.use('/sample', sampleRoutes);

module.exports = mainRoutes;