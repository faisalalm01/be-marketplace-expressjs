const { simpulRempah, market } = require("../models");
const { v4: uuid4 } = require("uuid");

module.exports = {
  createSimpulRempah: (req, res) => {
    const { body } = req;
    const id = uuid4();

    const Data = {
      id,
      logo: req.Image.url,
      ...body,
    };
    console.log(Data);
    simpulRempah
      .create(Data)
      .then((data) => {
        res.status(200).send({
          msg: "success create Simpul Rempah",
          status: 200,
          data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          msg: "failed create Simpul Rempah",
          status: 500,
          error,
        });
      });
  },

  getAllSimpulRempah: async (req, res) => {
    simpulRempah
      .findAll()
      .then((data) => {
        res.status(200).json({
          msg: "succes get data",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          msg: "failed get data",
          status: 500,
          err,
        });
      });
  },
  getSimpulRempahById: async (req, res) => {
    try {
      const { id } = req.params;

      const dataSimpul = await simpulRempah.findOne({
        where: { id },
        include: {
          model: market,
          as: "markets",
          attributes: ["id", "nama", "deskripsi", "logo"],
        },
      });
      const data = {
        id: dataSimpul.id,
        nama: dataSimpul.nama,
        alamat: dataSimpul.alamat,
        logo: dataSimpul.logo,
        market: dataSimpul.markets,
      };
      console.log(dataSimpul.dataValues);
      res.status(200).send({
        msg: "success get data simpul",
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
  editSimpulRempah: (req, res) => {
    const datam = simpulrempah.findOne({ where: { id: req.params.id } });
    const { body } = req;
    const { id } = req.params;
    const dataBody = {
      logo: req.Image.url,
      ...body,
    };

    simpulrempah
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
};
