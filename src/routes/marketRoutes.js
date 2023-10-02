const marketRoutes = require("express").Router();
const marketControllers = require("../controllers/marketControllers");
const cloudinaryMiddleware = require("../helpers/middleware/cloudinaryMiddleware");
const upploadMiddleware = require("../helpers/middleware/upploadMiddleware");
const authMiddleware = require("../helpers/middleware/authMiddleware");

marketRoutes.post(
  "/create",
  upploadMiddleware.uploadFileMarket,
  cloudinaryMiddleware.uploadCloudinaryMarket,
  authMiddleware.checkLogin,
  marketControllers.createMarket
);
marketRoutes.put(
  "/edit/:id",
  upploadMiddleware.uploadFileMarket,
  cloudinaryMiddleware.uploadCloudinaryMarket,
  authMiddleware.checkLogin,
  marketControllers.editMarket
);
marketRoutes.get("/list", marketControllers.getAllMarket);
marketRoutes.get("/detail/:id", marketControllers.getMarketById);

module.exports = marketRoutes;
