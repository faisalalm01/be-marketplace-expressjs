const { market, product } = require("../models")
const { v4: uuid4 } = require("uuid")

module.exports = {
  createMarket: (req, res) => {
    const { body } = req
    const id = uuid4()
    const userId = req.decodedToken.id
    const simpulrempahId = req.decodedToken.simpulrempahId

    const DataMarket = {
      id,
      userId,
      simpulrempahId,
      logo: req.Image.url,
      ...body,
    }
    console.log(DataMarket)
    market
      .create(DataMarket)
      .then((data) => {
        res.status(200).send({
          msg: "success create market",
          status: 200,
          data: data,
        })
      })
      .catch((error) => {
        res.status(500).send({
          msg: "failed create market",
          status: 500,
          error,
        })
      })
  },

  getAllMarket: async (req, res) => {
    try {
      let dataMarket = await market.findAll({
        order: [["updatedAt", "DESC"]],
      })
      res.status(200).json({
        msg: "success get all data",
        status: 200,
        data: dataMarket,
      })
    } catch (error) {
      res.status(500).json({
        msg: "failed get all data",
        status: 500,
        error,
      })
    }
  },

  editMarket: async (req, res) => {
    try {
      const currentMarket = await market.findByPk(req.params.id)
      if (!currentMarket) {
        res.status(404).json({ message: "data not found" })
      }

      const currentLogo = currentMarket.logo
      const data = {
        nama: req.body.nama,
        address: req.body.address,
        deskripsi: req.body.deskripsi,
        logo: currentLogo,
      }

      const marketUpdate = await market.update(data, {
        where: { id: req.params.id },
      })
      res.status(200).json({ message: "Market Updated", data: marketUpdate })
    } catch (error) {
      console.log(error)
    }
  },

  getMarketById: async (req, res) => {
    try {
      const { id } = req.params

      const dataMarketProduct = await market.findOne({
        where: { id },
        include: {
          model: product,
          as: "product",
          attributes: ["id", "image", "title", "price", "description"],
        },
      })
      console.log(dataMarketProduct.dataValues.address)
      const data = {
        id: dataMarketProduct.id,
        logo: dataMarketProduct.logo,
        nama: dataMarketProduct.nama,
        banner: dataMarketProduct.banner,
        address: dataMarketProduct.address,
        deskripsi: dataMarketProduct.deskripsi,
        product: dataMarketProduct.product,
      }
      res.status(200).send({
        msg: "success get data market",
        status: 200,
        data: data,
      })
    } catch (error) {
      res.status(500).send({
        msg: "failed get data market",
        status: 500,
        error,
      })
    }
  },
  deleteMarket: async (req, res) => {
    try {
      const { id } = req.params

      const markets = await market.findOne({
        where: { id },
      })
      console.log(markets)
      if (!markets) {
        return res.status(404).json({ message: "Item not found" })
      }
      await markets.destroy()
      res.send({
        msg: "Delete marker success",
        status: 200,
        market,
      })
    } catch (error) {
      res.send({
        msg: error.message,
        status: 500,
        error,
      })
    }
  },
}
