const { user, market, product, kategori } = require('../models');

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
                ...dataUser.dataValues,
                dataMarket,
            }
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

    editUser: async (req, res) => { 
        const userId = req.decodedToken.id; // Mengambil ID pengguna dari parameter rute
        const updatedUserData = req.body; // Mengambil data yang ingin diupdate dari permintaan

        try {
            // Temukan pengguna berdasarkan ID
            const users = await user.findByPk(userId);

            if (!users) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update data pengguna
            await users.update(updatedUserData);

            return res.status(200).json({ message: 'User updated successfully', data:users });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    getUserProduct: async (req, res) => {
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
                msg: 'success get detail data user product',
                status: 200,
                data: dataUserProduct
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed get detail data user product',
                status: 500,
                error
            })
        }
    },

    getUserMarket: async (req, res) => {
        try {
            const userId = req.decodedToken.id;
            const dataUser = await user.findOne({
                where: { id: userId }
            })
            const dataMarket = await market.findAll({
                where: { userId: userId },
                // include: {
                //     model: kategori,
                //     as: 'kategoris',
                //     attributes: ['nama']
                // }
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
            // delete dataUserProduct.dataUser.dataValues.password
            res.status(200).send({
                msg: 'success get detail data user product',
                status: 200,
                data: dataUserMarket
            })
        } catch (error) {
            res.status(500).send({
                msg: 'failed get detail data user product',
                status: 500,
                error
            })
        }
    },

}
