const mainRoutes = require('express').Router();
const productController = require('../controllers/productControllers');
const cloudinaryMiddleware = require('../helpers/middleware/cloudinaryMiddleware')
const upploadMiddleware = require('../helpers/middleware/upploadMiddleware')
const authMiddleware = require('../helpers/middleware/authMiddleware');

mainRoutes.post('/create',
    upploadMiddleware, 
    cloudinaryMiddleware, 
    authMiddleware.checkLogin, productController.createProduct
);
mainRoutes.put('/edit/:id', authMiddleware.checkLogin, productController.editProduct);
mainRoutes.get('/list', productController.getAllProduct);
mainRoutes.get('/detail/:id', productController.getDetailProduct);

module.exports = mainRoutes