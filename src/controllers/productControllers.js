const { product } = require('../models');
const { v4: uuid4 } = require('uuid');

module.exports = {

    createProduct: (req, res) => {
        const id = uuid4();
        const userId = req.decodedToken.id;
        const { body } = req;

        const dataProduct = {
            id,
            image: req.Image.url,
            userId,
            ...body
        }
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
                    description: a.description.slice(0, 50),
                    price: a.price
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
        const {id} = req.params;
        
        product.findOne({
            where: {id}
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
    }

}