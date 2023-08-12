const { market, product } = require('../models');
const { v4: uuid4 } = require('uuid');

module.exports = {

    createMarket : (req, res) => {
        const { body } = req;
        const id = uuid4();
        const userId = req.decodedToken.id

        const DataMarket = {
            id,
            userId,
            ...body
        }
        market.create(DataMarket)
        .then((data) => {
            res.status(200).send({
                msg: 'success create market',
                status: 200,
                data
            })
        })
        .catch((error) => {
            res.status(500).send({
                msg: 'failed create market',
                status : 500,
                error
            })
        })
    },

    getAllMarket : (req, res) => {
        market.findAll()
        .then((data) => {
            res.status(200).send({
                msg: 'success get all data',
                status: 200,
                data
            })
        })
        .catch((error) => {
            res.status(500).send({
                msg: 'failed get all data',
                status: 500,
                error
            })
        })
    },

    editMarket : (req, res) => {
        const {body} = req;
        const {id} = req.params;

        market.update(body, {
            where: {id}
        })
        .then((data) => {
            res.status(200).send({
                msg: 'success update data',
                status: 200,
                data
            })
        })
        .catch((error) => {
            res.status(500).send({
                msg: 'failed update data',
                status: 500,
                error
            })
        })
    },

    getMarketById: async(req, res) => {
        try {
            const { id } = req.params;

            const dataMarketProduct = await market.findOne({
                where: {id},
                include: {
                    model: product,
                    as: 'product',
                    attributes: ['id', 'image', 'title', 'price']
                }
            })
            const data = {
                id: dataMarketProduct.id,
                logo: dataMarketProduct.logo,
                nama: dataMarketProduct.nama,
                deskripsi: dataMarketProduct.deskripsi,
                product: dataMarketProduct.product,
              
            }
            res.status(200).send({
                msg: 'success get data market',
                status: 200,
                data: data
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed get data market',
                status: 500,
                error
            })
        }
    }

}