const { kategori } = require("../models");
const { v4: uuid4 } = require("uuid");

module.exports = {
  getALLCategory: (req, res) => {
    kategori
      .findAll()
      .then((data) => {
        res.status(200).send({
          msg: "succes get data",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "failed get data",
          status: 500,
          err,
        });
      });
  },
  CreateCategory: (req, res) => {
    const dataCategory = {
      nama: req.body.nama,
    };
    kategori
      .create(dataCategory)
      .then((data) => {
        res.status(200).send({
          msg: "succes post data",
          status: 200,
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          msg: "failed post data",
          status: 500,
          err,
        });
      });
  },
};
