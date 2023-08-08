const { example } = require('../models');
const { v4: uuid4 } = require('uuid');

module.exports = {

    // post data
    postDataSample: (req, res) => {
        const { body } = req;
        const id = uuid4();

        const DataSample = {
            id,
            ...body
        }
        example.create(DataSample)
            .then((data) => {
                res.status(200).send({
                    msg: "succes post data",
                    status: 200,
                    data,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    msg: 'failed post data',
                    status: 500,
                    err,
                })
            })
    },

    // get data
    getDataSample: (req, res) => {
        example.findAll()
            .then((data) => {
                res.status(200).send({
                    msg: "succes get data",
                    status: 200,
                    data,
                })
            })
            .catch((err) => {
                res.status(500).send({
                    msg: 'failed get data',
                    status: 500,
                    err,
                })
            })
    },
}