const userRoutes = require("express").Router();
const cartControllers = require("../controllers/cartControllers");
const orderControllers = require("../controllers/orderControllers");
const userControllers = require("../controllers/userControllers");
// const transactionControllers = require("../controllers/transactionController");
const authMiddleware = require("../helpers/middleware/authMiddleware");
const paymentMiddleware = require("../helpers/middleware/getListPaymentGateway");

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
  paymentMiddleware.processTranscation
);

// user Order
userRoutes.get(
  "/order",
  authMiddleware.checkLogin,
  orderControllers.getAllOrderUser
);
userRoutes.get(
  "/order/list",
  authMiddleware.checkLogin,
  orderControllers.getAllOrderAdmin
);
userRoutes.post(
  "/order",
  authMiddleware.checkLogin,
  orderControllers.createOrder
);

userRoutes.put(
  "/order/:id",
  authMiddleware.checkLogin,
  orderControllers.updateOrder
);
// userRoutes.get(
//   "/order/callback",
//   authMiddleware.checkLogin,
//   orderControllers.orderCallback
// );

// user Cart
userRoutes.get(
  "/cart",
  authMiddleware.checkLogin,
  cartControllers.getAllCartUser
);
userRoutes.post("/cart", authMiddleware.checkLogin, cartControllers.createCart);
userRoutes.delete(
  "/cart/:id",
  authMiddleware.checkLogin,
  cartControllers.deleteCart
);

module.exports = userRoutes;
