const userRoutes = require("express").Router();
const cartControllers = require("../controllers/cartControllers");
const orderControllers = require("../controllers/orderControllers");
const userControllers = require("../controllers/userControllers");
const transactionControllers = require("../controllers/transactionController");
const authMiddleware = require("../helpers/middleware/authMiddleware");
// const paymentMiddleware = require("../helpers/middleware/getListPaymentGateway");

userRoutes.get(
  "/detail",
  authMiddleware.checkLogin,
  userControllers.getDataUser
);
userRoutes.put("/update", authMiddleware.checkLogin, userControllers.editUser);

userRoutes.get(
  "/product",
  authMiddleware.checkLogin,
  userControllers.getUserProduct
);
userRoutes.get(
  "/market",
  authMiddleware.checkLogin,
  userControllers.getUserMarket
);
userRoutes.post(
  "/transaction/create",
  authMiddleware.checkLogin,
  transactionControllers.createTranscation
);

// user Order
userRoutes.get(
  "/order",
  authMiddleware.checkLogin,
  orderControllers.getAllOrderUser
);
userRoutes.post(
  "/order",
  authMiddleware.checkLogin,
  orderControllers.createOrder
);

// user Cart
userRoutes.get(
  "/cart",
  authMiddleware.checkLogin,
  cartControllers.getAllCartUser
);
userRoutes.post("/cart", authMiddleware.checkLogin, cartControllers.createCart);

module.exports = userRoutes;
