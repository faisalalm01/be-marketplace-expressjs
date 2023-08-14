const { user, market, product } = require('../models');
const kategori = require('../models/kategori');

module.exports = {

    getDataUser: async (req, res) => {
        try {
            const userId = req.decodedToken.id;
            const dataUser = await user.findOne({
                where: { id: userId }
            })
            const dataMarket = await market.findAll({
                where: { userId: userId },
                include: {
                    model: product,
                    as: 'product',
                    attributes: ['id', 'image', 'title', 'price']
                }
            })
            delete dataUser.dataValues.password
            const dataUserMarket = {
                // id: dataUser.id,
                // firstname: dataUser.firstname,
                // lastname: dataUser.lastname,
                // username: dataUser.username,
                // email: dataUser.email,
                // address: dataUser.address,
                // nohp: dataUser.nohp,
                ...dataUser.dataValues,
                dataMarket,
            }
            // delete dataUserMarket.dataUser.dataValues.password
            res.status(200).send({
                msg: 'success get detail data user',
                status: 200,
                data: dataUserMarket
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed get detail data user',
                status: 500,
                error
            })
        }
    },

    getUserProduct: async (req,res) => {
        try {
            const userId = req.decodedToken.id;
            const dataUser = await user.findOne({
                where: { id: userId }
            })
            const dataProduct = await product.findAll({
                where: { userId: userId },
                // include: {
                //     model: kategori,
                //     as: 'kategoris',
                //     attributes: ['nama']
                // }
            })
            delete dataUser.dataValues.password
            const dataUserProduct = {
                // id: dataUser.id,
                // firstname: dataUser.firstname,
                // lastname: dataUser.lastname,
                // username: dataUser.username,
                // email: dataUser.email,
                // address: dataUser.address,
                // nohp: dataUser.nohp,
                ...dataUser.dataValues,
                dataProduct,
            }
            // delete dataUserProduct.dataUser.dataValues.password
            res.status(200).send({
                msg: 'success get detail data user',
                status: 200,
                data: dataUserProduct
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed get detail data user',
                status: 500,
                error
            })
        }
    },

}