const { cart } = require('../models');
const { v4: uuid4 } = require('uuid');

module.exports = {

    getAllCartUser : async(req, res) => {
        try {
            const userId = req.decodedToken.id

            const getCartUser = await cart.findAll({
                where: {
                    userId: userId
                }
            });
            res.status(200).send({
                msg:'success get all carts',
                status:200,
                data: getCartUser
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed get all carts',
                status: 500,
                error
            })
        }
    }

}