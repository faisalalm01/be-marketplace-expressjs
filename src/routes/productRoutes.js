const productRoutes = require('express').Router();
const productController = require('../controllers/productControllers');
const cloudinaryMiddleware = require('../helpers/middleware/cloudinaryMiddleware')
const upploadMiddleware = require('../helpers/middleware/upploadMiddleware')
const authMiddleware = require('../helpers/middleware/authMiddleware')

productRoutes.post('/', 
    upploadMiddleware, 
    cloudinaryMiddleware, 
    authMiddleware.checkLogin, productController.createProduct
    );

module.exports = productRoutes