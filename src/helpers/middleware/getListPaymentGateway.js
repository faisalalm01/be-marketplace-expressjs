const midtransClient = require("midtrans-client");
const { transaction } = require("../../models/");
// const core = new midtransClient.CoreApi({
//     isProduction: false,
//     serverKey: process.env.MIDTRANS_SERVER_KEY
// })

module.exports = {
  processTranscation: async (req, res) => {
    try {
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.SERVER_KEY_MIDTRANS,
        clientKey: process.env.CLIENT_KEY_MIDTRANS,
      });

      const parameter = {
        transaction_details: {
          order_id: req.body.order_id,
          gross_amount: req.body.total,
        },
        // customer_details: {
        //   first_name: req.body.name,
        // },
      };
      snap.createTransaction(parameter).then(async (transactiondata) => {
        const dataPayment = {
          response: JSON.stringify(transactiondata),
        };
        console.log(transactiondata);
        // const tokentransaction = transactiondata.token;
        await transaction.create({
          orderId: req.body.order_id,
          userId: req.decodedToken.id,
          total: req.body.total,
          status: "Belum Bayar",
          token_transaction: transactiondata.token,
        });
        res.status(200).send({
          msg: "success",
          dataPayment,
          token: transactiondata.token,
        });
      });
    } catch (error) {
      res.send({
        msg: "error",
        status: 500,
        error,
      });
    }
  },
  // paymentStatus: async (req, res) => {
  //   try {
  //     const { orderId } = req.params;

  //     // Inisialisasi klien Midtrans
  //     const midtrans = new midtransClient.CoreApi({
  //       isProduction: false, // Sesuaikan dengan lingkungan Anda
  //       serverKey: process.env.SERVER_KEY_MIDTRANS, // Gantilah dengan kunci server Midtrans Anda
  //     });

  //     // Panggil API Midtrans untuk memeriksa status pembayaran berdasarkan orderId
  //     const statusResponse = await midtrans.transaction.status(orderId);

  //     // Status pembayaran dapat ditemukan di statusResponse.transaction_status
  //     const paymentStatus = statusResponse.transaction_status;

  //     // Kirim status pembayaran ke klien
  //     res.json({ paymentStatus });
  //   } catch (error) {
  //     console.error("Gagal memeriksa status pembayaran:", error);
  //     res.status(500).json({ error: "Gagal memeriksa status pembayaran" });
  //   }
  // },
};
