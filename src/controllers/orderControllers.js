const { order, product } = require("../models");
const { v4: uuid4 } = require("uuid");

module.exports = {
  createOrder: async (req, res) => {
    const id = uuid4();
    const userId = req.decodedToken.id;
    const { productId, totalProduct } = req.body;
    const getProduct = await product.findOne({
      where: { id: productId },
    });
    const dataProduct = await product.findByPk(productId);
    if (!dataProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (product.stock < totalProduct) {
      return res.status(400).json({ error: "Not enough stock available" });
    }
    console.log(dataProduct.stock);
    dataProduct.stock -= totalProduct;
    await dataProduct.save();
    const totalPrice = totalProduct * getProduct.price;
    const dataOrder = {
      id,
      userId,
      productId,
      totalProduct,
      totalPrice,
    };
    order
      .create(dataOrder)
      .then((data) => {
        res.status(200).send({
          msg: "success create order",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          msg: "failed create order",
          status: 500,
          error,
        });
      });
  },

  getAllOrderUser: async (req, res) => {
    try {
      const userId = req.decodedToken.id;
      const getOrder = await order.findAll({
        where: { userId: userId },
        include: {
          model: product,
          as: "product",
          attributes: ["id", "image", "title", "price", "description"],
        },
      });
      res.status(200).json({
        msg: "success get order",
        status: 200,
        data: getOrder,
      });
    } catch (error) {
      res.status(500).json({
        msg: "failed get order",
        status: 500,
        error,
      });
    }
  },
};
