const categoryRoutes = require("express").Router();
const categoryController = require("../controllers/categoryController");
categoryRoutes.get("/", categoryController.getALLCategory);
// categoryRoutes.post("/", categoryController.CreateCategory);

module.exports = categoryRoutes;
