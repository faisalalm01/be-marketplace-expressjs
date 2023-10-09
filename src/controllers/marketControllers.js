const { market, product } = require("../models");
const { v4: uuid4 } = require("uuid");

module.exports = {
  createMarket: (req, res) => {
    const { body } = req;
    const id = uuid4();
    const userId = req.decodedToken.id;
    const simpulrempahId = req.decodedToken.simpulrempahId;

    const DataMarket = {
      id,
      userId,
      simpulrempahId,
      logo: req.Image.url,
      ...body,
    };
    console.log(DataMarket);
    market
      .create(DataMarket)
      .then((data) => {
        res.status(200).send({
          msg: "success create market",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          msg: "failed create market",
          status: 500,
          error,
        });
      });
  },

  getAllMarket: async (req, res) => {
    try {
      let dataMarket = await market.findAll({
        order: [["updatedAt", "DESC"]],
      });
      res.status(200).json({
        msg: "success get all data",
        status: 200,
        data: dataMarket,
      });
    } catch (error) {
      res.status(500).json({
        msg: "failed get all data",
        status: 500,
        error,
      });
    }
  },

  editMarket: (req, res) => {
    const datam = market.findOne({ where: { id: req.params.id } });
    const { body } = req;
    const { id } = req.params;
    const dataBody = {
      logo: req.Image.url,
      ...body,
    };

    market
      .update(dataBody, {
        where: { id },
      })
      .then((data) => {
        res.status(200).send({
          msg: "success update data",
          status: 200,
          data: data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          msg: "failed update data",
          status: 500,
          error,
        });
      });
  },

  getMarketById: async (req, res) => {
    try {
      const { id } = req.params;

      const dataMarketProduct = await market.findOne({
        where: { id },
        include: {
          model: product,
          as: "product",
          attributes: ["id", "image", "title", "price", "description"],
        },
      });
      console.log(dataMarketProduct.dataValues.address);
      const data = {
        id: dataMarketProduct.id,
        logo: dataMarketProduct.logo,
        nama: dataMarketProduct.nama,
        banner: dataMarketProduct.banner,
        address: dataMarketProduct.address,
        deskripsi: dataMarketProduct.deskripsi,
        product: dataMarketProduct.product,
      };
      res.status(200).send({
        msg: "success get data market",
        status: 200,
        data: data,
      });
    } catch (error) {
      res.status(500).send({
        msg: "failed get data market",
        status: 500,
        error,
      });
    }
  },
};
