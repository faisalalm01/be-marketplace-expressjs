const { market } = require('../models');
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
    }

}