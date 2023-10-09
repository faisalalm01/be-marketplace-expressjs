const { cart, product } = require("../models");
const { v4: uuid4 } = require("uuid");

module.exports = {
  getAllCartUser: (req, res) => {
    // try {
    const userId = req.decodedToken.id;
    cart
      .findAll({
        where: {
          userId: userId,
        },
        include: {
          model: product,
          as: "products",
          attributes: ["id", "image", "title", "price", "stock", "description"],
        },
      })
      .then((data) => {
        res.status(200).send({
          msg: "success get all carts",
          status: 200,
          data,
        });
      })
      // } catch (error) {
      .catch((error) => {
        res.status(500).send({
          msg: "failed get all carts",
          status: 500,
          error,
        });
      });
    // }
  },

  createCart: (req, res) => {
    const id = uuid4();
    const { productId } = req.body;
    const userId = req.decodedToken.id;

    const userCart = {
      id,
      userId,
      productId,
    };

    cart
      .create(userCart)
      .then((data) => {
        res.send({
          msg: "success create cart",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.send({
          msg: "failed create cart",
          status: 500,
          error,
        });
      });
  },
  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;

      const cartdata = await cart.findOne({
        where: { id },
      });
      // console.log(products);
      if (!cartdata) {
        return res.status(404).json({ message: "Cart Not Found" });
      }
      await cartdata.destroy();
      res.status(200).json({
        msg: "delete cart success",
        status: 200,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
        status: 500,
      });
    }
  },
};
