const mainRoutes = require('express').Router();
const productController = require('../controllers/productControllers');
const cloudinaryMiddleware = require('../helpers/middleware/cloudinaryMiddleware')
const upploadMiddleware = require('../helpers/middleware/upploadMiddleware')
const authMiddleware = require('../helpers/middleware/authMiddleware');
const cartControllers = require('../controllers/cartControllers');

mainRoutes.post('/',
    // upploadMiddleware, 
    // cloudinaryMiddleware, 
    authMiddleware.checkLogin, productController.createProduct
);
mainRoutes.put('/:id', authMiddleware.checkLogin, productController.editProduct);
mainRoutes.get('/list', productController.getAllProduct);
mainRoutes.get('/detail/:id', productController.getDetailProduct);

// get carts product
mainRoutes.get('/cart', cartControllers.getAllCartUser);

module.exports = mainRoutes