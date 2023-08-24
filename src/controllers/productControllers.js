const { product, kategori, market } = require('../models');
const { v4: uuid4 } = require('uuid');

module.exports = {

    createProduct: async (req, res) => {
        const id = uuid4();
        const userId = req.decodedToken.id;
        const { body } = req;

        const getUserMarket = await market.findOne({
            where: { userId: userId },
            // include: {
            //     model: kategori,
            //     as: 'kategoris',
            //     attributes: ['id']
            // }
        })
        const dataProduct = {
            id,
            image: req.Image.url,
            userId,
            ...body
        }
        // console.log(dataProduct.marketId === getUserMarket.dataValues.id);
        if (dataProduct.marketId !== getUserMarket.dataValues.id) {
            res.send({
                msg: 'failed post data, karena market tidak ditemukan'
            })
        } else if (dataProduct.marketId === getUserMarket.dataValues.id) {
            product.create(dataProduct)
                .then((data) => {
                    res.status(200).send({
                        msg: 'success create product',
                        status: 200,
                        data
                    })
                })
                .catch((error) => {
                    res.status(500).send({
                        msg: 'failed create product',
                        status: 500,
                        error
                    })
                })
        }
    },

    getAllProduct: async (req, res) => {
        try {

            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 4
            const offset = (page - 1) * limit;

            // const data = 
            const dataProduct = await product.findAll({ offset, limit })

            const newdata = dataProduct.map((a) => {
                return {
                    id: a.id,
                    image: a.image,
                    title: a.title,
                    description: a.description.slice(0, 70),
                    price: a.price,
                }
            })
            res.status(200).send({
                msg: 'success get all product',
                status: 200,
                limit,
                page,
                data: newdata
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed get all product',
                status: 500,
                error
            })
        }
    },

    getDetailProduct: (req, res) => {
        const { id } = req.params;

        product.findOne({
            where: { id },
            include: {
                model: kategori,
                as: 'kategoris',
                attributes: ['nama']
            }
        })
            .then((data) => {
                res.status(200).send({
                    msg: 'success get detail product',
                    status: 200,
                    data
                })
            })
            .catch((error) => {
                res.status(500).send({
                    msg: 'failed get detail product',
                    status: 500,
                    error
                })
            })
    },

    editProduct: (req, res) => {
        const { id } = req.params;
        const { body } = req;

        product.update(body, {
            where: { id }
        })
            .then((data) => {
                res.status(200).send({
                    msg: 'success update data product',
                    status: 200,
                    data
                })
            })
            .catch((error) => {
                res.status(500).send({
                    msg: 'failed update data product',
                    status: 500,
                    error
                })
            })
    }

}