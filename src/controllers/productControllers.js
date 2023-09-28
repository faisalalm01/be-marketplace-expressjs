const { product, kategori, market, Sequelize } = require("../models");
const { v4: uuid4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
const Op = Sequelize.Op;

module.exports = {
  createProduct: async (req, res) => {
    const id = uuid4();
    const userId = req.decodedToken.id;
    const { body } = req;
    const dataProduct = {
      id,
      image: req.Image.url,
      userId,
      ...body,
    };

    // const getUserMarket = await market.findAll({
    //   where: { userId: userId },
    //   attributes:['id']
    // }).then((usersIdMarket) => {
    //   usersIdMarket.forEach((userIdMarket) => {
    //     console.log(`${userIdMarket.id}`);
    //     if (dataProduct.marketId !== userIdMarket.id) {
    //       res.status(404).json({
    //       msg: "failed post data, karena market tidak ditemukan",
    //     });
    //     } else {
           product
      .create(dataProduct)
      .then((data) => {
        res.status(200).json({
          msg: "success create product",
          status: 200,
          // market: getUserMarket,
          data,
        });
      })
      .catch((error) => {
        res.status(500).json({
          msg: "failed create product",
          status: 500,
          error,
        });
      });
        // }
      // })
    // });
  },

  getAllProduct: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 8;
      const search = req.query.search;
      const offset = (page - 1) * limit;

      if (search) {
        let dataProduct = await product.findAll({
          offset,
          limit,
          where: {
            title: {
              [Op.like]: `%${search}%`,
            },
          },
        });
        const newdata = dataProduct.map((a) => {
          return {
            id: a.id,
            image: a.image,
            title: a.title,
            description: a.description.slice(0, 70),
            price: a.price,
          };
        });
        res.status(200).send({
          msg: "success search product by name",
          status: 200,
          limit,
          page,
          querySearch: search,
          data: newdata,
        });
      } else {
        // const data =
        dataProduct = await product.findAll({ offset, limit });
        const newdata = dataProduct.map((a) => {
          return {
            id: a.id,
            image: a.image,
            title: a.title,
            description: a.description.slice(0, 70),
            price: a.price,
          };
        });
        res.status(200).send({
          msg: "success get all product",
          status: 200,
          limit,
          page,
          data: newdata,
        });
      }
    } catch (error) {
      res.status(500).send({
        msg: "failed get all product",
        status: 500,
        error,
      });
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const detailProduct = await product.findOne({
        where: { id },
        include: [
          {
            model: kategori,
            as: "kategoris",
            attributes: ["nama"],
          },
          {
            model: market,
            // as: 'markets',
            attributes: ["id", "nama", "logo"],
          },
        ],
      });
      const getAllProduct = await product.findAll({
        where: { marketId: detailProduct.dataValues.marketId },
      });
      const dataMarketProduct = getAllProduct.length;
      const data = {
        id: detailProduct.id,
        image: detailProduct.image,
        title: detailProduct.title,
        stock: detailProduct.stock,
        description: detailProduct.description,
        price: detailProduct.price,
        kategoris: detailProduct.kategoris,
        market: detailProduct.market,
        totalProduct: dataMarketProduct,
      };
      res.status(200).send({
        msg: "success get detail product",
        status: 200,
        data: data,
      });
    } catch (error) {
      res.status(500).send({
        msg: "failed get detail product",
        status: 500,
        error,
      });
    }
  },

  editProduct: (req, res) => {
    const { id } = req.params;
    const { body } = req;

    product
      .update(body, {
        where: { id },
      })
      .then((data) => {
        res.status(200).send({
          msg: "success update data product",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          msg: "failed update data product",
          status: 500,
          error,
        });
      });
  },
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;

      const products = await product.findOne({
        where: { id },
      });
      // console.log(products);
      if (!products) {
        return res.status(404).json({ message: "Item not found" });
      }
      const publicId = products.image
        .split("http://res.cloudinary.com/dkngf160s/raw/upload/v1692958550/")
        .pop()
        .split(".")
        .join(".");
      console.log(publicId);
      await cloudinary.uploader.destroy(publicId);
      await products.destroy();
      res.send({
        msg: "test success",
        status: 200,
        products,
      });
    } catch (error) {
      res.send({
        msg: "error test",
        status: 500,
        error,
      });
    }
  },
};
