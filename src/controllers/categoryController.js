const { kategori } = require("../models");

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
};
