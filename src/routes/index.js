const mainRoutes = require("express").Router();
const sampleRoutes = require("./exampleRoutes");
const authRoutes = require("./authRoutes");
const marketRoutes = require("./marketRoutes");
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");

mainRoutes.get("/", async (req, res) => {
  res.send({ message: "api its works 🐻" });
});

// sample route
mainRoutes.use("/sample", sampleRoutes);

// route
mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/market", marketRoutes);
mainRoutes.use("/product", productRoutes);
mainRoutes.use("/user", userRoutes);
mainRoutes.use("/category", categoryRoutes);

module.exports = mainRoutes;
