const { order, product } = require("../models");
const { v4: uuid4 } = require("uuid");
const midtransClient = require("midtrans-client");
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY_MIDTRANS,
  clientKey: process.env.CLIENT_KEY_MIDTRANS,
});
module.exports = {
  createOrder: async (req, res) => {
    try {
      const uuid = uuid4();
      const waktu_saat_ini = Date.now();
      const id = `${uuid}${waktu_saat_ini}`;
      // console.log(Math.random() * 100);
      // console.log(id);
      const userId = req.decodedToken.id;
      const { address, provinsi, kota, kecamatan, kode_pos } = req.decodedToken;
      const alamat_pengiriman = `${address}, ${kecamatan}, ${kota}, ${provinsi}, ${kode_pos}`;
      // console.log(alamat_pengiriman);
      const { productId, totalProduct } = req.body;
      const getProduct = await product.findOne({
        where: { id: productId },
      });
      const dataProduct = await product.findByPk(productId);
      if (!dataProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      if (product.stock < totalProduct) {
        return res.status(400).json({ error: "Not enough stock available" });
      }
      // console.log(dataProduct.stock);
      dataProduct.stock -= totalProduct;
      await dataProduct.save();
      const totalPrice = totalProduct * getProduct.price;
      // midtrans section
      const datatransaction = {
        transaction_details: {
          order_id: id,
          gross_amount: totalPrice,
        },
        customer_details: {
          name: `${req.decodedToken.firstname} ${req.decodedToken.lastname}`,
        },
      };

      snap.createTransaction(datatransaction).then(async (transactiondata) => {
        const dataPayment = {
          response: JSON.stringify(transactiondata),
        };
        console.log(transactiondata);
        // const tokentransaction = transactiondata.token;
        const dataOrder = {
          id,
          userId,
          productId,
          totalProduct,
          totalPrice,
          alamat_pengiriman,
          status_bayar: "Belum Bayar",
          status_kirim: "belum Dikirim",
          token_transaction: transactiondata.token,
        };
        await order.create(dataOrder).then((data) => {
          return res.status(200).send({
            msg: "success create order",
            status: 200,
            data,
          });
        });
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
        status: 500,
      });
    }

    // order
    //   .create(dataOrder)
    //   .then((data) => {
    //     res.status(200).send({
    //       msg: "success create order",
    //       status: 200,
    //       data,
    //     });
    //   })
    //   .catch((error) => {
    //     res.status(500).send({
    //       msg: "failed create order",
    //       status: 500,
    //       error,
    //     });
    //   });
  },

  updateOrder: async (req, res) => {
    try {
      const order_id = req.params.id;
      const { token_transaction, status_bayar, status_kirim } = req.body;
      const dataorder = await order.findByPk(order_id);
      if (!token_transaction && !status_bayar && !status_kirim) {
        dataorder.token_transaction = dataorder.token_transaction;
        dataorder.status_bayar = dataorder.status_bayar;
        dataorder.status_kirim = dataorder.status_kirim;
      }
      dataorder.status_bayar = status_bayar;
      dataorder.status_kirim = status_kirim;
      dataorder.token_transaction = token_transaction;
      await dataorder.save();
      res.status(200).json({
        msg: "success update",
        status: 200,
        data: dataorder,
      });
    } catch (error) {
      res.status(500).json({
        msg: error.message,
        status: 500,
      });
    }
  },

  // orderCallback: async (req, res) => {
  //   try {
  //     const order_id = req.query.order_id;
  //     const dataorder = await order.findByPk(order_id);
  //     if (req.query.transaction_status === "pending") {
  //       dataorder.status_bayar = "Belum Bayar";
  //     } else if (req.query.transaction_status === "settlement") {
  //       dataorder.status_bayar = "Sudah Bayar";
  //     }
  //     await dataorder.save();
  //     res.status(200).json({
  //       msg: "success update",
  //     });
  //   } catch (error) {
  //     res.status(404).json({
  //       msg: error.message,
  //     });
  //   }
  // },
  getAllOrderAdmin: async (req, res) => {
    try {
      const userId = req.decodedToken.id;
      const getOrder = await order.findAll({
        // where: { userId: userId },
        include: {
          model: product,
          where: { userId: userId },
          as: "product",
          attributes: ["id", "image", "title", "price", "description"],
        },
      });
      res.status(200).json({
        msg: "success get order",
        status: 200,
        data: getOrder,
      });
    } catch (error) {
      res.status(500).json({
        msg: "failed get order",
        status: 500,
        error,
      });
    }
  },
  getAllOrderUser: async (req, res) => {
    try {
      const userId = req.decodedToken.id;
      const getOrder = await order.findAll({
        where: { userId: userId },
        include: {
          model: product,
          as: "product",
          attributes: ["id", "image", "title", "price", "description"],
        },
      });
      res.status(200).json({
        msg: "success get order",
        status: 200,
        data: getOrder,
      });
    } catch (error) {
      res.status(500).json({
        msg: "failed get order",
        status: 500,
        error,
      });
    }
  },
};
