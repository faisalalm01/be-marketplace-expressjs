const sampleRoutes = require('express').Router();
const sampleController = require('../controllers/exampleControllers');

// sample endpoint
sampleRoutes.get('/', sampleController.getDataSample );
sampleRoutes.post('/', sampleController.postDataSample );

module.exports = sampleRoutes