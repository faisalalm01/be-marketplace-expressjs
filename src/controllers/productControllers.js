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
                status : 500,
                error
            })
        })
    }

}